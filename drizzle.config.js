/** @type {import('drizzle-kit').Config} */
const config = {
	out: './drizzle',
	schema: './db/schema.js',
	verbose: true,
	strict: true,
	dialect: 'postgresql',
	casing: 'snake_case',
	dbCredentials: {
		url: process.env.NEXT_PUBLIC_DATABASE_URL,
	},
};

export default config;
