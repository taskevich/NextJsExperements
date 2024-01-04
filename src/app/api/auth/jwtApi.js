"use server"

import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = "secretkey"

export async function sign(payload) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + (60 * 60); // one day

    return new SignJWT({...payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(SECRET_KEY));
}

export async function verify(token) {
    const {payload} = await jwtVerify(token.value, new TextEncoder().encode(SECRET_KEY));
    return payload;
}