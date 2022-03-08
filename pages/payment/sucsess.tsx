import Layout from '../../layouts/Main';
//clear the redux state
export default function Named()  {
    return(
        <Layout>
            <section className="error-page">
            <div className={"container"}>
                <h1>Sucsessful Checkout</h1>
                <p>You will recive a confirmation email in your inbox soon</p>
                <a href={"/"} className={"btn btn--rounded btn--yellow"}>Return Home</a>
            </div>
            </section>
        </Layout>       
    )
}