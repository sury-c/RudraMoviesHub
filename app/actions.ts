'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isAdmin, cookieName } from '../../lib/auth';
import { db } from '../../lib/db';

function requireAdmin() {
  if (!isAdmin()) redirect('/admin/login');
}

function textValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function optionalHttpsUrl(value: string, label: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') throw new Error();
    return url.toString();
  } catch {
    throw new Error(`${label} must be a valid HTTPS URL.`);
  }
}

export async function addMovie(formData: FormData) {
  requireAdmin();
  const title = textValue(formData, 'title');
  const language = textValue(formData, 'language');
  const yearRaw = textValue(formData, 'release_year');
  const year = Number(yearRaw);
  if (!title || !language || !Number.isInteger(year) || year < 1888 || year > 2100) {
    throw new Error('Enter a title, language and valid release year.');
  }
  const payload = {
    title,
    description: textValue(formData, 'description') || null,
    poster_url: optionalHttpsUrl(textValue(formData, 'poster_url'), 'Poster URL'),
    category: textValue(formData, 'category') || null,
    release_year: year,
    language,
    content_url: optionalHttpsUrl(textValue(formData, 'content_url'), 'Authorized content URL'),
  };
  const { error } = await db().from('movies').insert(payload);
  if (error) throw new Error(`Could not add movie: ${error.message}`);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateMovie(formData: FormData) {
  requireAdmin();
  const id = Number(textValue(formData, 'id'));
  const title = textValue(formData, 'title');
  const language = textValue(formData, 'language');
  const year = Number(textValue(formData, 'release_year'));
  if (!Number.isSafeInteger(id) || id < 1 || !title || !language || !Number.isInteger(year) || year < 1888 || year > 2100) {
    throw new Error('Check the movie details and try again.');
  }
  const { error } = await db().from('movies').update({
    title,
    description: textValue(formData, 'description') || null,
    poster_url: optionalHttpsUrl(textValue(formData, 'poster_url'), 'Poster URL'),
    category: textValue(formData, 'category') || null,
    release_year: year,
    language,
    content_url: optionalHttpsUrl(textValue(formData, 'content_url'), 'Authorized content URL'),
  }).eq('id', id);
  if (error) throw new Error(`Could not update movie: ${error.message}`);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteMovie(formData: FormData) {
  requireAdmin();
  const id = Number(textValue(formData, 'id'));
  if (!Number.isSafeInteger(id) || id < 1) throw new Error('Invalid movie ID.');
  const { error } = await db().from('movies').delete().eq('id', id);
  if (error) throw new Error(`Could not delete movie: ${error.message}`);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function uploadPoster(formData: FormData) {
  requireAdmin();
  const file = formData.get('poster');
  if (!(file instanceof File) || file.size === 0) throw new Error('Choose an image first.');
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
    throw new Error('Use a JPG, PNG, WEBP or AVIF image.');
  }
  if (file.size > 5 * 1024 * 1024) throw new Error('Poster must be 5 MB or smaller.');
  const extension = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1];
  const path = `posters/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const { error } = await db().storage.from('movie-posters').upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw new Error(`Poster upload failed: ${error.message}`);
  const { data } = db().storage.from('movie-posters').getPublicUrl(path);
  revalidatePath('/admin');
  redirect(`/admin?poster=${encodeURIComponent(data.publicUrl)}`);
}

export async function logoutAdmin() {
  requireAdmin();
  cookies().delete(cookieName);
  redirect('/admin/login');
}
