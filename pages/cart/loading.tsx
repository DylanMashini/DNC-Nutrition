import Layout from "../../layouts/Main";
import { useRouter } from "next/router";

import {server} from "../../utils/server";

export default function Named({ lineItems }) {
    const router = useRouter();

    console.log("heee"+JSON.stringify(lineItems));		
    fetch(`${server}/api/createPaymentSession`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(lineItems),
		})
			.then(res => res.json())
			.then(res => {
				router.push(res.url);
			});

    return(
        <Layout>
            <section className="error-page">
				<div className={"container"}>
					<h1>Loading</h1>
					<p>
						You will be redirected to the payment screen soon. 
					</p>
					
				</div>
			</section>
        </Layout>
    )
}

export function getServerSideProps(context) {
    return {
        props: {
            lineItems: JSON.parse(context.query.lineItems)
        }
    }
}