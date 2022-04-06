import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
export default async function getUserInfo(req:NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).json({
            message: "Method not allowed"
        });
        return
    }
    const request = req.body;
    const email = request.email;
    const session = request.session;
    const uri = process.env.MONGOURI;
    const client = new MongoClient(uri)
    try {
        await client.connect()
        const db = client.db('DNC')
        const collection = db.collection('users')
        const user = await collection.findOne({email: email.toLowerCase()})
        if (user) {
            if (user.session == session) {
                //session is valid
                let userInfo = user;
                delete userInfo.password;
                delete userInfo.salt;
                delete userInfo.session;
                delete userInfo._id;
                res.status(200).json({user: userInfo, auth: true})
            }
        } else{
            res.status(401).json({message:"user not found"})
        }
    } finally {
        client.close();
    }
}