import { NextApiRequest, NextApiResponse } from 'next';
import getAllProds from "../../utils/getAllProds";
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    getAllProds()
    res.status(200)
}