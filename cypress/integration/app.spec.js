/// <reference types="cypress" />

describe("Pagination", () => {
	it("should navigate to pages 2-5", () => {
		cy.visit("http://localhost:3000/");
		//gets the 2 button
		cy.get("#Pagination > nav > button:nth-child(4)").click();
		cy.url().should("include", "/2");
		cy.get("#Pagination > nav > button:nth-child(5)").click();
		cy.url().should("include", "/3");
		cy.get("#Pagination > nav > button:nth-child(6)").click();
		cy.url().should("include", "/4");
		cy.get("#Pagination > nav > button:nth-child(7)").click();
		cy.url().should("include", "/5").end();
	});
	it("should navigate to page 55", () => {
		//navigates to page 55
		cy.visit("http://localhost:3000/products/55");
		cy.get(
			"#Pagination > nav > button.nextui-c-cTdvQQ.nextui-c-huiNHE.nextui-c-cTdvQQ-dZWCtT-active-true.nextui-c-cTdvQQ-SWDEj-animated-true.nextui-pagination-item.nextui-pagination-item-active.nextui-pagination-item-animated > span"
		).should("contain", "55");
	});
});
describe("Categories", () => {
	it("should navigate to curamed catagories", () => {
		cy.visit("http://localhost:3000/");
		cy.get(
			"#__next > div > main > section.products-page > div > section > div > form > div > div > select"
		).select("Curamed");
		cy.wait(1000);
		cy.url().should("include", "Cura");
	});
});

describe("Purchase", () => {
	it("Should add product to cart and checkout at stripe", () => {
		// ignore stripe error
		cy.on("uncaught:exception", err => {
			// Allow stripe error: "paymentRequest Element didn't mount normally"
			if (err.message.includes("paymentRequest")) {
				return false;
			}
		});

		cy.visit("http://localhost:3000/products/1");
		// add top three items to cart
		for (let i = 1; i <= 3; i++) {
			cy.get(
				`#__next > div > main > section.products-page > div > section > section > div:nth-child(${i}) > div.product__image > a`
			).click();
			cy.get(".add-to-cart-button").click();
			cy.visit("http://localhost:3000/products/1");
		}
		cy.get(".btn-cart").click();
		cy.url().should("include", "cart");
		cy.get(".checkout-button").click();
		// get total at checkout
		cy.get(".final-total-text").then($total => {
			const total = $total.text().split("$")[1];
			cy.wrap(total).as("total");
		});
		// navigate to stripe
		cy.get(".proceed-to-payment-button").click();

		// make sure stripe cost matches DNC cost
		cy.get("#OrderDetails-TotalAmount > span", {
			timeout: 20000,
		}).then($stripeTotal => {
			cy.get("@total").should("eq", $stripeTotal.text().split("$")[1]);
		});
		// enter details
		cy.get("#email").type("testcaseemail@dylanmashini.com");
		cy.get("#shippingName").type("Test Case");
		cy.get("#shippingAddressLine1").type(
			"1600 Pennsylvania Avenue, N.W.{enter}"
		);
		cy.get("#shippingLocality").type("Washington");
		cy.get("#shippingPostalCode").type("20500");
		cy.get("#shippingAdministrativeArea").select("DC");
		cy.get("#phoneNumber").type("6054756968");
		cy.get("#cardNumber").type("4242424242424242");
		cy.get("#cardExpiry").type("12/34");
		cy.get("#cardCvc").type("123");
		// submit
		cy.get(".SubmitButton").scrollIntoView();
		cy.wait(500);
		cy.get(".SubmitButton", {
			timeout: 20000,
		}).click();
		// make sure we are at sucsess page
		cy.url({ timeout: 20000 }).should("include", "sucsess");
		// wait for database
		cy.wait(5000);
		// verify that order happened in clover and stripe
		cy.request("http://localhost:3000/api/test/verifyTestOrder");
	});
});
