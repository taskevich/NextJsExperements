import { cookies } from "next/headers"
import { use } from "react";
import { verify } from "../api/auth/jwtApi";

export default function Protected() {
    const cookieStore = cookies()
    const user = use(verify(cookieStore.get("token")))
    return (
        <div>
            <h1>Username: {user.username}</h1>
            <p>Email: {user.email}</p>
            <hr/>
        </div>
    )
}