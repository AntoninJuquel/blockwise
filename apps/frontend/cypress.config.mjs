import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:5173", // vite default port
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
		supportFile: "cypress/support/e2e.ts",
		chromeWebSecurity: false,
	},
});
