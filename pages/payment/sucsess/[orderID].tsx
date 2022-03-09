import Layout from '../../../layouts/Main';


//clear the redux state
export default function Named() {

    return (
        <Layout>
            <div>
                <p>Loading...</p>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const orderID = context.params.orderID;
    const res = context.res
    fetch(`https://scl-sandbox.dev.clover.com/v1/orders/${orderID}/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CLOVER_OAUTH}`
        },
        body: JSON.stringify({ tender: { label: "stripe" }, "ecomind": "ecom" })
    }).then(result => result.json()).then(result => console.log(result))


    res.statusCode = 302;
    res.setHeader('Location', `/payment/sucsess`)
    return {
        props: {}
    }
}