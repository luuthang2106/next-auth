import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { decode } from 'jsonwebtoken'

const authContext = createContext({})

export function ProvideAuth({ children }: PropsWithChildren<any>) {
    const auth = useProvideAuth()
    useEffect(() => {
        auth.revalidate()
    }, [auth.loggedIn])
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
    const [user, setUser] = useState({ id: "", email: "" })
    const [loggedIn, setLoggedIn] = useState(false)
    const [accessToken, setAccessToken] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const signin = async (email: string, password: string) => {
        setLoading(true)
        try {
            const response = await fetch('/api/user/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data: any = await response.json()
            setLoading(false)
            if (data.success) {
                const decoded: any = decode(data.accessToken)
                setLoggedIn(true)
                setAccessToken(data.accessToken)
                setUser({
                    id: decoded.id,
                    email: decoded.email
                })
            } else {
                setMessage(data.message)
            }

        } catch (error) {
            setLoading(false)
            setMessage(error.toString())
        }

    }
    const revalidate = async () => {
        try {
            const response = await fetch('/api/user/revalidate')
            const data: any = await response.json()
            setLoading(false)
            if (data.success) {
                const decoded: any = decode(data.accessToken)
                setLoggedIn(true)
                setAccessToken(data.accessToken)
                setUser({
                    id: decoded.id,
                    email: decoded.email
                })
            } else {
                setLoggedIn(false)
                setUser({ id: "", email: "" })
                setAccessToken("")
            }

        } catch (error) {
            setLoading(false)
            setLoggedIn(false)
            setUser({ id: "", email: "" })
            setAccessToken("")
        }
    }
    const signout = async () => {
        try {
            setLoggedIn(false)
            setUser({ id: "", email: "" })
            setAccessToken("")
            await fetch('/api/user/revoke')
        } catch (error) {
        }
    }
    const signup = async (email: string, password: string): Promise<any> => {
        setLoading(true)
        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data: any = await response.json()
            setLoading(false)
            return data

        } catch (error) {
            return {
                success: false,
                message: error.toString()
            }
        }
    }
    return {
        user,
        signin,
        signout,
        signup,
        loading,
        loggedIn,
        accessToken,
        message,
        revalidate,
    }
}