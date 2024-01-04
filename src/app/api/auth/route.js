"use server"

import { createUser, getUser } from "@/app/db/db"
import { loginSchema, registerSchema } from "@/app/schemas"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { sign } from "./jwtApi"

export async function GET(req, res) {
  return NextResponse.json({ success: false, message: "Method not allowd", payload: null }, { status: 405 })
}

export async function POST(req, res) {
  const cookieStore = cookies()
  const { action, username, email, password, password2 } = await req.json()

  switch(action) {
    case "login":
      var { error } = loginSchema.validate({ username, password })
      if (error)
        return NextResponse.json({success: false, message: error.details[0].message.replace(/['"]+/g, '')}, { status: 401 })

      var result = await login({ username, password })
      
      if (result !== false) {
          cookieStore.set("token", result)
          return NextResponse.json({ success: true, message: "OK", payload: null }, { status: 200 }) 
      } else {
          return NextResponse.json({ success: false, message: "User not found", payload: null }, { status: 404 }) 
      }
    case "registration":
      if (password !== password2) {
        return NextResponse.json({ success: false, message: "Passwords isn't match", payload: null }, {status: 401})
      }

      var { error } = registerSchema.validate({ username, email, password, password2 })
      if (error)
        return NextResponse.json({success: false, message: error.details[0].message.replace(/['"]+/g, '')}, { status: 401 })

      var result = await register({ username, email, password })
      if (!result)
        return NextResponse.json({ success: false, message: "User already exists", payload: null })
      return NextResponse.json({ success: true, message: "You successully registred!", payload: null })
    default:
      return NextResponse.json({ success: false, message: "Unknown action", payload: null }, {status: 401})
  }

}

const register = async (obj) => {
  const isUserExists = await getUser(obj.username)
  if (isUserExists.length != 0)
    return false

    const result = await createUser(obj.username, obj.email, obj.password)

  return true
};
  
const login = async (obj) => {
  const isUserExists = await getUser(obj.username)
  if (isUserExists.length == 0)
    return false

  const user = isUserExists[0]

  return await sign(user)
}
  