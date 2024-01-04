"use client"

import { useState } from "react"
import { LoginForm } from "../../components/loginForm"
import { RegistrationForm } from "../../components/registrationForm"
import { redirect } from 'next/navigation'

export default function Auth() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')

    const toggleForm = () => {
        setIsLogin(!isLogin)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const action = isLogin ? "login" : "registration"
        try {
            const response = await fetch("http://localhost:3000/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    action: action,
                    username: username,
                    email: email,
                    password: password,
                    password2: password
                 })
            })
            
            const {isSuccess, message} = await response.json()
            console.log(response)
            if (isSuccess) {
                setError('')
                if (action === "login") {
                    redirect("/protected")
                }
            }
            else {
                setError(message)
            }
            return response
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                {
                    isLogin ? 
                    <>
                        <LoginForm
                            username={username}
                            password={password}
                            onChangeUsername={setUsername}
                            onChangePassword={setPassword}
                        />
                        { 
                            error !== '' ? 
                            <p>{error}</p> : <p></p>
                        }
                        <a onClick={toggleForm}>Нет аккаунта?</a>
                    </>
                    :
                    <>
                        <RegistrationForm
                            username={username}
                            email={email}
                            password={password}
                            password2={password2}
                            onChangeUsername={setUsername}
                            onChangeEmail={setEmail}
                            onChangePassword={setPassword}
                            onChangePassword2={setPassword2}
                        />
                        { 
                            error !== '' ? 
                            <p>{error}</p> : <p></p>
                        }
                        <a onClick={toggleForm}>Есть аккаунт?</a>
                    </>
                }
            </form>
        </div>
    )
}