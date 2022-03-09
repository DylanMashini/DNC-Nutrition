import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).end()
        return
    }
    return new Promise((resolve, reject) => {
        console.log("newsletter here")
        res.status(200).end()
        resolve

    })
    return
}