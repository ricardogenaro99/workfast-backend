const allowOrigins = [
	"http://localhost:3000",
	"http://localhost:3001",
	"https://workfast-postulate.vercel.app",
	"https://workfast-recruiter.vercel.app",
];

const config = {
	application: {
		cors: {
			origin: function (origin, callback) {
				if (!origin) return callback(null, true);
				if (allowOrigins.indexOf(origin) === -1) {
					const msg =
						"The CORS policy for this site does not allow access from the specified Origin.";
					return callback(new Error(msg), false);
				}
				return callback(null, true);
			},
			credentials: true,
		},
	},
};

module.exports = config;
