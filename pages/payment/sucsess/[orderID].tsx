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

export async function getServerSideProps({ res, orderID }) {

    fetch(`https://scl-sandbox.dev.clover.com/v1/orders/${orderID}/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OAUTH_TOKEN}`
        },
        body: JSON.stringify({ tender: { label: "stripe" } })
    }).then(result => result.json()).then(result => console.log(result))


    res.statusCode = 302;
    res.setHeader('Location', `/payment/sucsess`)
    return {
        props: {}
    }
}