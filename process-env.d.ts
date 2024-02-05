declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SERVER_PORT: string;

			POSTGRES_HOST: string;
			POSTGRES_PORT: string;
			POSTGRES_USER: string;
			POSTGRES_PASSWORD: string;
			POSTGRES_DB: string;

			DATABASE_URL: string;

			PGADMIN_DEFAULT_EMAIL: string;
			PGADMIN_DEFAULT_PASSWORD: string;

			JWT_SECRET: string;
			JWT_EXPIRED_IN: string;
			JWT_MAXAGE: string;
			[key: string]: string | undefined;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
