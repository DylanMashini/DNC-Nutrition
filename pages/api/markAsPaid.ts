
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
        const orderID = session.metadata.cloverID
        const address = session.shipping
        fetch(`https://scl.clover.com/v1/orders/${orderID}/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CLOVER_ECOMMERCE}`
        },
        body: JSON.stringify({ tender: { label: "stripe" }, "ecomind": "ecom" })
    }).then(result => result.json()).then(result => {
        if (result.status != 'paid') {
            console.log(JSON.stringify(result))
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
                res.status(400).end()
            })
            .catch((error) => {
                console.error(error)
            })
            
            
        } else {
            console.log(session)
            const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            //create list of order items here
            const orderItems = JSON.parse(session.metadata.lineItems)
            let emailItems = `
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>\n`
            for (let i = 0; i<orderItems.length; i++) {
                const item = orderItems[i]
                emailItems = emailItems.concat(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>${String((item.price/100)*item.qty)}</td>
                </tr>\n
                `)
            }
            const msg = {
            to: 'discountnutritionatl@gmail.com', // Change to your recipient
            from: 'ecommerce@dylanmashini.com', // Change to your verified sender
            subject: 'Order from ecommerce',
            text: 'Order',
            html: `
            <h1>Got a Order!</h1>
            <p>Clover Order ID: ${orderID}</p>
            <p>Paid in stripe</p>
            <br />
            <p>Order Items: </p>
            <table>
                ${emailItems}
            </table>
            <br />
            <p>Customer Phone Number: ${session["customer_details"]["phone"]}</p>
            <p>Customer Email: ${session["customer_details"]["email"]}</p>
            <p>Customer Name: ${session["customer_details"]["name"]}</p>
            <p>Customer Address Line 1: ${session["customer_details"]["address"]["line1"]}</p>
            ${session["customer_details"]["address"]["line2"] ? `<p>Customer Address Line 2: ${session["customer_details"]["address"]["line2"]}</p>` : ""}
            <p>Customer City: ${session["customer_details"]["address"]["city"]}</p>
            <p>Customer State: ${session["customer_details"]["address"]["state"]}</p>
            <p>Customer Zip: ${session["customer_details"]["address"]["postal_code"]}</p>
            `,
            }
            sgMail.send(msg).then(() => {
                res.status(200).end()
            })
            .catch((error) => {
                console.error(error)
            })
            
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
        console.error(err)
        return res.status(400).send(`Webhook Error: ${err.message}`);

    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Fulfill the purchase...
        fulfillOrder(session);
    }

    res.status(200)

}