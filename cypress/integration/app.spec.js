const { get } = require("lodash");

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
		)
			.should("contain", "55")
			.end();
	});
});

describe("Categories", () => {
	it("should navigate to curamed catagories", () => {
		cy.visit("http://localhost:3000/");
		cy.get(
			"#__next > div > main > section.products-page > div > section > div > form > div > div > select"
		).select("Curamed");
		cy.wait(1000);
		cy.get(
			"#__next > div > main > section.products-page > div > section > section > div:nth-child(1) > div.product__description > h3"
		)
			.contains("cura", { matchCase: false })
			.end();
	});
});

describe("Search", () => {
	it("should search for anxiocalm", () => {
		cy.visit("http://localhost:3000/");
		cy.get(
			"#__next > div > header > div > div > button.search-form-wrapper > i"
		).click();
		cy.get(
			"#__next > div > header > div > div > button.search-form-wrapper.search-form--active > form > input[type=text]"
		).type("anxiocalm{enter}");
		cy.get(
			"#__next > div > main > section.products-page > div > section > section > div:nth-child(1) > div.product__description > h3"
		)
			.contains("anxio", { matchCase: false })
			.end();
	});
	it("should search for ion gut health", () => {
		cy.visit("http://localhost:3000/");
		cy.get(
			"#__next > div > header > div > div > button.search-form-wrapper > i"
		).click();
		cy.get(
			"#__next > div > header > div > div > button.search-form-wrapper.search-form--active > form > input[type=text]"
		).type("ion{enter}");
		cy.get(
			"#__next > div > main > section.products-page > div > section > section > div:nth-child(1) > div.product__description > h3"
		)
			.contains("ion", { matchCase: false })
			.end();
	});
});

describe("Products and Cart", () => {
	it(
		"should add first and second products and add it to the cart",
		{ retries: 3 },
		() => {
			cy.visit("http://localhost:3000");
			cy.get(
				"#__next > div > main > section.products-page > div > section > section > div:nth-child(1) > div.product__image > a > span > img"
			).click();
			cy.get(
				"#__next > div > main > section.product-single > div > div.product-single__content > section.product-content > div.product-content__filters > div:nth-child(3) > div > button"
			).click();
			cy.get(
				"#__next > div > header > div > div > button.btn-cart > span"
			).contains("1");
			cy.get("#clickable").click();
			cy.get(
				"#__next > div > main > section.products-page > div > section > section > div:nth-child(2) > div.product__image > a > span > img"
			).click();
			cy.get(
				"#__next > div > main > section.product-single > div > div.product-single__content > section.product-content > div.product-content__filters > div:nth-child(3) > div > button"
			).click();
			cy.get(
				"#__next > div > header > div > div > button.btn-cart > span"
			)
				.contains("2")
				.end();
		}
	);
	it(
		"should add two units of the third item to the cart",
		{ retries: 3 },
		() => {
			cy.visit("http://localhost:3000");
			cy.get(
				"#__next > div > main > section.products-page > div > section > section > div:nth-child(3) > div.product__image > a > span > img"
			).click();
			//clicks plus button 3 times
			cy.get(
				"#__next > div > main > section.product-single > div > div.product-single__content > section.product-content > div.product-content__filters > div:nth-child(3) > div > div > button:nth-child(3)"
			).click();
			//add product to cart
			cy.get(
				"#__next > div > main > section.product-single > div > div.product-single__content > section.product-content > div.product-content__filters > div:nth-child(3) > div > button"
			).click();
			//clicks on cart
			cy.get(
				"#__next > div > header > div > div > button.btn-cart"
			).click();
			cy.get(
				"#__next > div > main > section > div > div.cart-list > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > span"
			).should("contain", "2");
		}
	);
});

describe("payment", () => {
	it("should create a new payment session", () => {
		cy.request({
			url: "http://localhost:3000/api/createPaymentSession",
			method: "POST",
			body: [
				{ id: "DD0KS8YRENHQE", count: 2 },
				{ id: "0WZEJ8FA73P8R", count: 1 },
			],
			headers: {
				contentType: "application/json",
			},
		})
			.its("body")
			.its("url")
			.should("include", "checkout.stripe.com");
	});
});
