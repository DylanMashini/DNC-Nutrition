describe("Reset Database", () => {
	it("Should reset the database", () => {
		cy.request("http://localhost:3000/api/test/resetDatabase");
	});
});
