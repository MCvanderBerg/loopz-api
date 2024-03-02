import dotenv from "dotenv"

export default function setupConfig() {
    const args = process.argv.slice(2);
    let envFile = `.env.${args[0]}`;

    if (args.length !== 1) {
        console.error("Usage: node app.js <environment>");
        console.error("Defaulting to dev");
        envFile = "dev"
    }

    dotenv.config({ path: envFile });

    return {
        db_host: process.env.DB_HOST,
        db_user: process.env.DB_USER,
        db_password: process.env.DB_PASSWORD,
        db_database: process.env.DB_DATABASE,
        db_port: process.env.DB_PORT
    };
}
