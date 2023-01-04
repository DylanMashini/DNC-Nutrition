import fs from "fs/promises";

export default async function () {
	// if on client, fetch from appropriate location
	// @ts-ignore
	if (typeof window !== "undefined" && window.Cypress) {
		// get from localhost
		return await (
			await fetch("http://localhost:3000/api/testProducts")
		).json();
	} else if (typeof window !== "undefined") {
		// get from gh pages
		return await (
			await fetch(
				"https://dylanmashini.github.io/DNC-Nutrition/prods.json"
			)
		).json();
	}

	// on server, if testing get from file, otherwise get from gh
	if (
		process.env.NEXT_PUBLIC_TEST_ENV ||
		process.env.NODE_ENV !== "production"
	) {
		return JSON.parse(
			(await fs.readFile("./src/utils/testProducts.json")).toString()
		);
	} else {
		return await (
			await fetch(
				"https://dylanmashini.github.io/DNC-Nutrition/prods.json"
			)
		).json();
	}
}
