import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import crypto from "crypto";

export default async function Handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).end()
        return
    }
    const body = req.body
    if (!(body.email)) {
        res.status(400).json({ error: "Missing paramaters" })
        return
    }
    const email = body.email
    const client = new MongoClient(process.env.MONGO_URL)
    try {
        await client.connect()
        const db = client.db("DNA")
        const users = db.collection("users");
        const user = await users.findOne({ email: email.toLowerCase() })
        if (!user) {
            res.status(400).json({ error: "User not found" })
            return
        }
        const resetID = crypto.randomUUID()
        await users.updateOne({ email: email.toLowerCase() }, { $set: { resetPassword: resetID } })
        //send reset email here with link that goes to /resetPassword/:resetID

    } finally {
        client.close()
    }
}