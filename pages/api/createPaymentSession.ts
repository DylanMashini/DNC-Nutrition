import type { NextApiRequest, NextApiResponse } from 'next'
import {server} from "../../utils/server"
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        res.status(405).end()
        return
    }
    const stripeProds = [];
    const cloverProds = [];
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const body = req.body
    for (var i = 0; i < body.length; i++) {
        const sku = body[i]
        const response = await (await fetch(`${server}/api/product/${sku}`)).json()
        if (response.error) {
                res.status(400).json({error: response.error})
                return
            }
            console.log(response)
            
            const product = response
            const price = product.price
            const currency = "USD"
            const name = product.name

        const priceID = await stripe.prices.create({
            product_data: {unit_amount: price*100,
            currency: 'usd',}
            }, {apiKey: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'});
        stripeProds.push({price: priceID,quantity:1, name:name})
        cloverProds.push({id:product.id})


    }
    const order = (await fetch(`${process.env.CLOVER_URL}/v3/merchants/${process.env.CLOVER_MERCHANT_ID}/atomic_order/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CLOVER_TOKEN}`
        },
        body: JSON.stringify({ orderCart: { lineItems: cloverProds, groupLineItems: "false" } })
    })).json()
    console.log(order)
    
}