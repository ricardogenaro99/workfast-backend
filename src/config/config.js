const config = {
	application: {
		cors: {
			server: [
				{
					origin: "*",
					credentials: true,
				},
			],
		},
	},
};

module.exports = config;