import Cookies from 'cookies'
import type { NextApiRequest, NextApiResponse } from 'next'
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
    cookies.set("refreshToken")
    return res.status(200).send({})
}