
import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') {
        res.status(405).end()
        return
    }
    const fulfillOrder = (session) => {
        console.log("fufill order here" + JSON.stringify(session))
        const orderID = session.metadata.cloverID
        const address = session.shipping
        fetch(`https://scl-sandbox.dev.clover.com/v1/orders/${orderID}/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CLOVER_OAUTH}`
        },
        body: JSON.stringify({ tender: { label: "stripe" }, "ecomind": "ecom" })
    }).then(result => result.json()).then(result => {
        if (result.status != 'paid') {
            console.log("NOT MARKED AS PAID IN CLOVER")
            console.log("CLOVER ORDER ID: " + orderID)
            console.log("STRIPE PAYMENT" + JSON.stringify(session))
            const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
            to: 'dylanmashini123@gmail.com', // Change to your recipient
            from: 'ecommerce@dylanmashini.com', // Change to your verified sender
            subject: 'Error in marking order as paid in clover',
            text: 'error marking order as paid',
            html: `
            <h1>Error marking order as paid</h1>
            <p>Clover Order ID: ${orderID}</p>
            <p>Stripe Payment: ${JSON.stringify(session)}</p>
            `,
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
            res.status(400).end()
            
        } else {
            console.log("sending emailll")
            const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
            to: 'dylanmashini123@gmail.com', // Change to your recipient
            from: 'ecommerce@dylanmashini.com', // Change to your verified sender
            subject: 'Order from ecommerce',
            text: 'Order',
            html: `
            <h1>Got a order!!</h1>
            <p>Clover Order ID: ${orderID}</p>
            <p>Stripe Payment: ${JSON.stringify(session)}</p>
            `,
            }
            sgMail.send(msg).then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
            res.status(200).end()
        }
    }).catch(err => {
        console.error(err);
    })
    
    }
    const buf = await buffer(req);
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    //get this from stripe dashboard
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);

    } catch (err) {
        console.log(err)
        return res.status(400).send(`Webhook Error: ${err.message}`);

    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Fulfill the purchase...
        fulfillOrder(session);
    }

    res.status(200)

}