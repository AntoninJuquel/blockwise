export default {
	api: {
		output: {
			target: "./src/hooks/useApi.ts",
			client: "react-query",
			baseUrl: "http://localhost:3000",
		},
		input: {
			target: "../../shared/swagger.json",
		},
	},
};
