import type { NextApiRequest, NextApiResponse } from 'next';
import {MongoClient} from 'mongodb';
import bcrypt from "bcryptjs";
import crypto from "crypto";
export default async (req:NextApiRequest, res:NextApiResponse) => {
    const request = req.body;
    const email = request.email;
    const firstName = request.firstName;
    const lastName = request.lastName;
    const password = request.password;
    const line1 = request.line1;
    const line2 = (request.line2 ? request.line2 : "");
    const city = request.city;
    const state = request.state;
    const zip = request.zip;
    const uri = process.env.MONGOURI;
    const client = new MongoClient(uri)
    const validatePassword = (password) => {
        const length = /^[\s\S]{8,32}$/;
        const visable = /^[\x20-\x7E]+$/;
        const nums = /[0-9]/;
        if (length.test(password) && visable.test(password) && nums.test(password)) {
            return true;
        } else {
            return false;
        }
    }
    const validateEmail = (email) => {
        //email regex from stackoverflow
        const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return regex.test(email);
    }
    if (!(validateEmail(email))) {
        res.status(400).json({message:"invalid email"});
        return
    }
     if (!(validatePassword(password))) {
                console.log("regex fail")
                res.status(400).json({"message": "Password must contain at least 8 characters, with one number"})
                return
            }
    try {
        client.connect(async err => {
            if (err) {
                console.log(err);
            } else {
        const db = client.db('DNA')
        const collection = db.collection('users')
        const user = await collection.findOne({email: email.toLowerCase()})
        if (user) {
            res.status(400).json({
                message: 'User already exists'
            })
            console.log("user already exists")
            return
        } else {
           
            bcrypt.hash(password, 12, async (err, hash) => {
                console.log("hashed pw")
            const session = crypto.randomUUID();
            const result = await collection.insertOne({email: email.toLowerCase(), password: hash,firstName: firstName, lastName:lastName,line1:line1, line2: line2, city: city, state: state, zip:zip, salt: 12, session: session})
            res.status(200).json({res: result, auth:true, session:session})

            return
            })
        }
            }
        })
        
    } finally {
        client.close()
    }
}