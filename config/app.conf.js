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


    // DB_HOST=
    // DB_USER=
    // DB_PASSWORD=
    // DB_PORT=3000
    // DB_DATABASE=
    return {
        db_host: "loopz-api.mysql.database.azure.com",
        db_user: "leech",
        db_password: "Noeline101#Sebastiaan1",
        db_database: "loopz_database_dev",
    };
}
