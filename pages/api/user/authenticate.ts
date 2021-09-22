import type { NextApiRequest, NextApiResponse } from 'next'
import { compareSync } from 'bcrypt'
import { query } from 'app/mysql'
import { sign } from 'jsonwebtoken'
import Cookies from 'cookies'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        case "POST":
            return postHandler(req, res)
        default:
            return res.status(405).send("Method Not Allowed")
    }
}
const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send("Bad request")
    }
    const [user] = await query(`SELECT * FROM user WHERE email = '${email}'`) as any[]

    if (user) {
        const validPassword = compareSync(password, user.password)
        if (validPassword) {
            const cookies = Cookies(req, res)
            // Set a cookie
            cookies.set('refreshToken', sign({id: user.id}, process.env.APP_REFRESH_TOKEN_KEY!, {
                expiresIn: '7d',
            }), {
                httpOnly: true, // true by default
            })
            return res.send({
                success: true,
                message: "success",
                accessToken: sign({
                    id: user.id,
                    email: user.email
                }, process.env.APP_ACCESS_TOKEN_KEY!, {
                    expiresIn: '10m'
                })
            })
        } else {
            return res.send({ success: false, message: "Ivalid Email/Password" })
        }
    } else {
        return res.send({ success: false, message: "Ivalid Email/Password" })
    }

}
