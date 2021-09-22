import Cookies from 'cookies'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sign, SignOptions, verify, decode } from 'jsonwebtoken'
import { query } from 'app/mysql'

const err = {
    success: false,
    message: "Ivalid username/password"
}
const tokenSignOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: '10m',
    noTimestamp: true,
    mutatePayload: true,
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        case "GET":
            return getHandler(req, res)
        default:
            return res.status(405).send("Method Not Allowed")
    }
}
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = Cookies(req, res)
    const refreshToken = cookies.get('refreshToken') || ""
    try {
        verify(refreshToken!, process.env.APP_REFRESH_TOKEN_KEY!)
        const decoded: any = decode(refreshToken)
        const [user] = await query(`SELECT * FROM user WHERE id = '${decoded.id}'`) as any[]
        return res.send({
            success: true,
            message: 'success',
            accessToken: sign({
                id: user.id,
                email: user.email
            }, process.env.APP_ACCESS_TOKEN_KEY!, { expiresIn: '10m' })
        })
    } catch (error) {
        return res.status(403).send("Invalid token")
    }
}