import type { NextApiRequest, NextApiResponse } from 'next'
import { hashSync, genSaltSync } from 'bcrypt'
import { query } from 'app/mysql'

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
        return res.send({ success: false, message: "Ivalid Email/Password" })
    }

    try {
        const oldUser = await query(`SELECT * FROM user WHERE email = '${email}'`) as any[]

        if (!!oldUser.length) {
            return res.send({ success: false, message: 'Email already exists' })
        } else {
            await query(`INSERT INTO user(id, email, password) VALUES(UUID(), '${email}', '${hashSync(password, genSaltSync())}')`) as Object
            return res.send({
                success: true,
                message: "success",
            })
        }
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}