import Layout from '../layouts/Main';
//clear the state redux
export default function() {
    return(
        <Layout>
            <section className="error-page">
            <div className={"container"}>
                <h1>Sucsessful Checkout</h1>
                <p>You will recive a confirmation in your inbox soon</p>
                <a href={"/"} className={"btn btn--rounded btn--yellow"}>Return Home</a>
            </div>
            </section>
        </Layout>
    )
}