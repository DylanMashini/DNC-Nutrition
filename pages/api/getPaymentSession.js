export default function(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
      }
    const finalJSON = req.body
    fetch("https://api.clover.com/invoicingcheckoutservice/v1/checkouts", {
			method: "POST",
			headers: {
				Authorization: "Bearer adeea858-25fc-7cb4-f3ff-5c176e2404ec",
				"X-Clover-Merchant-Id": "DMF44Z2ZC6PTT",
				"Content-Type": "application/json",
			},
			body: finalJSON,
		})
			.then(result => res.json())
			.then(result => {
				//response from clover looks like: {"href":"https://www.clover.com/checkout/3d5d5072-66cc-459a-b3a5-f668abdd5abb?mode=checkout","checkoutSessionId":"3d5d5072-66cc-459a-b3a5-f668abdd5abb","expirationTime":"2022-03-03@02:02:42.839+0000","createdTime":"2022-03-03@01:47:42.841+0000"}
				const url = result.href;
                res.status(200).json({"url":url})
                
				
			})
			.catch(err => {console.log(err)
                res.status(400).json({error:err})
            });
}