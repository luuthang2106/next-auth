import { useAuth } from 'hooks/useAuth'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Login: NextPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const {
        loggedIn,
        message,
        signin,
    }: any = useAuth()
    useEffect(() => {
        loggedIn && router.push('/')
    }, [loggedIn])

    return (
        <div className="w-screen h-screen flex items-center justify-center text-sm">
            <div className="w-11/12 md:w-96 shadow p-6">
                <div className="flex flex-col w-full space-y-4">
                    <p className="uppercase text-center font-bold">Login</p>
                    <p className="text-red-400 text-center">
                        {message}
                    </p>
                    <div className="flex flex-col space-y-2">
                        <label>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="h-6 px-2 shadow outline-none" type="email" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="h-6 px-2 shadow outline-none" type="password" />
                    </div>
                    <button onClick={() => signin(username, password)} className="uppercase w-full bg-gray-200 font-bold text-gray-500 py-3">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
