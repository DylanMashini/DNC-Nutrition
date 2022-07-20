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
		cy.get(
			"#__next > div > main > section.products-page > div > section > section > div:nth-child(1) > div.product__description > h3"
		).contains("cura", { matchCase: false });
	});
});

describe("End to end product", () => {
	it("should add first product to cart, and go to stripe checkout page", () => {
		cy.visit("http://localhost:3000");
		cy.get(
			"#__next > div > main > section.products-page > div > section > section > div:nth-child(1) > div.product__image > a > span > img"
		).click();
		cy.get(
			"#__next > div > main > section.product-single > div > div.product-single__content > section.product-content > div.product-content__filters > div:nth-child(3) > div > button"
		).click();
		cy.get("#__next > div > header > div > div > button.btn-cart > span")
			.contains("1", { matchCase: false })
			.click();
		cy.get(
			"#__next > div > main > section > div > div.cart-actions > div > a"
		).click();
		cy.get(
			"#__next > div > main > section > div > div.cart-actions > div > a"
		).click();
		cy.url().should("include", "stripe");
	});
});
