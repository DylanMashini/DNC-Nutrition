import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from "mongodb"

export default async function updateUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).json({ message: "invalid method" })
        return
    }
    const request = req.body;
    const email = request.email;
    const firstName = request.firstName;
    const lastName = request.lastName;
    const userEmail = request.userEmail;
    const line1 = request.line1;
    const line2 = (request.line2 ? request.line2 : "");
    const city = request.city;
    const state = request.state;
    const zip = request.zip;
    const session = request.session;
    const uri = process.env.MONGOURI
    const client = new MongoClient(uri)
    try {
        await client.connect()
        const db = client.db("DNA")
        const collection = db.collection("users")
        const user = await collection.findOne({ email: userEmail.toLowerCase() })
        const newUser = await collection.findOne({ email: email.toLowerCase() })
        if (user && (!newUser || userEmail == email)) { //make sure that user exists and that if they are attemting to change their email that one doesn't already exist with that email
            if (user.session != session) {
                res.status(400).json({ message: "invalid session" })
                return
            }
            const result = await collection.updateOne({ email: userEmail.toLowerCase() }, { $set: { firstName: firstName, lastName: lastName, email: email, line1: line1, line2: line2, city: city, state: state, zip: zip } })
            //update stripe user
            const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

            const customer = await stripe.customers.update(
                user.stripeID,
                { email: email, name: firstName + " " + lastName, shipping: { address: { line1: line1, line2: line2, city: city, state: state, postal_code: zip, country: "US", }, name: firstName + " " + lastName } }
            );

            res.status(200).json({ auth: true })

        } else {
            if (!user) {
                res.status(400).json({ message: "user not found" })
            } else {
                res.status(400).json({ message: "email already exists" })
            }

        }

    } finally {
        client.close()
    }

}

