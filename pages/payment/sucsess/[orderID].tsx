import Layout from '../../../layouts/Main';
const sdk = require('api')('@clover-platform/v3#34zpp1qkz32xmbk');


//clear the redux state
export default function Named()  {
    
    return(
        <Layout>
            
        </Layout>       
    )
}

export async function getServerSideProps({res, orderID}) {
    
    fetch(`https://scl-sandbox.dev.clover.com/v1/orders/${orderID}/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OAUTH_TOKEN}`
        },
        body: JSON.stringify({tender:{label:"stripe"}})
    }).then(result => result.json()).then(result => console.log(result))
//     sdk.auth(process.env.CLOVER_OAUTH);
//     sdk.PostOrdersIdPay({ecomind: 'ecom'}, {orderId: orderID})
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

//     res.statusCode = 302;
//     res.setHeader('Location', `/payment/sucsess`)
    return {
        props: {}
    }
}