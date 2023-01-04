const dev = process.env.NODE_ENV !== "production";
const test_env =
	process.env.NEXT_PUBLIC_TEST_ENV ||
	(typeof window !== "undefined" && window.Cypress);

export const server =
	dev || test_env ? "http://localhost:3000" : "https://www.dncnutrition.com";
