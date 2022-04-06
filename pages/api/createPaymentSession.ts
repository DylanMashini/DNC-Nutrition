import type { NextApiRequest, NextApiResponse } from 'next'
import { server } from "../../utils/server"
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        res.status(405).end()
        return
    }
    const stripeProds = [];
    const cloverProds = [];
    let email = ""
    let name = ""
    let id = undefined
    if (req.cookies.userInfo) {
        const cookie = JSON.parse(req.cookies.userInfo)
        email = cookie.email
        name = cookie.firstName + " " + cookie.lastName
        id = cookie.stripeID
    } else {
        email = "";
    }
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    let cost = 0;
    const body = req.body
    console.log("body: " + JSON.stringify(body))
    const prods = require("../../prods.json");
    for (var i = 0; i < body.length; i++) {
        const id = body[i].id
        const qty = body[i].count
        //const response = json of product
        const response = prods.find(x => x.id == id)
        if (response.error) {
            res.status(400).json({ error: response.error })
            return
        }
        
        const product = response
        const price = product.price
        const name = product.name
        console.log("price: " + price)
        const priceID = await stripe.prices.create({
            unit_amount: Number(price),
            currency: 'usd',
            product_data: { name: name, },
        }).catch(err => console.error(err));

        stripeProds.push({ price: priceID.id, quantity: qty })
        for (let i = 0; i < qty; i++) {
            cloverProds.push({ item: { id: product.id }})
        }
        cost += price * qty

    }
   
    const order = await (await fetch(`${process.env.CLOVER_URL}/v3/merchants/${process.env.CLOVER_MERCHANT_ID}/atomic_order/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CLOVER_TOKEN}`
        },
        body: JSON.stringify({ orderCart: { lineItems: cloverProds } })
    })).json()
    const cloverOrderID = order.id
    const taxPriceID = await stripe.prices.create({
        unit_amount: (order.total - cost),
        currency: 'usd',
        product_data: { name: "GA State Tax", },
    });
    stripeProds.push({ price: taxPriceID.id, quantity: 1 })
    //check if user exists

    try {
        // Create Checkout Sessions from body params.
        const sessionOptions = {
            line_items: stripeProds,
            mode: 'payment',
            success_url: `${server}/payment/sucsess/`,
            cancel_url: `${server}/?canceled=true`,
            metadata: { cloverID: cloverOrderID },
            shipping_address_collection: { allowed_countries: ['US'] },
        }
        if (id) {
            console.log(id);
            sessionOptions["customer"] = id
        }
        const session = await stripe.checkout.sessions.create(sessionOptions);
        res.status(200).json({ url: session.url });
    } catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json(err.message);
    }
}


