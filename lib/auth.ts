import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';
const COOKIE='rudra_admin_session';
function signature(value:string){return createHmac('sha256',process.env.SESSION_SECRET||'').update(value).digest('hex')}
export function makeSession(username:string){const payload=Buffer.from(JSON.stringify({u:username,exp:Date.now()+1000*60*60*12})).toString('base64url');return `${payload}.${signature(payload)}`}
export function isAdmin(){try{const token=cookies().get(COOKIE)?.value;if(!token)return false;const [payload,sig]=token.split('.');if(!payload||!sig)return false;const expected=signature(payload);const a=Buffer.from(sig);const b=Buffer.from(expected);if(a.length!==b.length||!timingSafeEqual(a,b))return false;const data=JSON.parse(Buffer.from(payload,'base64url').toString());return data.u===process.env.ADMIN_USERNAME&&data.exp>Date.now()}catch{return false}}
export const cookieName=COOKIE;
