const dotenv = require("dotenv")

function setupConfig() {
    const args = process.argv.slice(2);
    let envFile = `.env.${args[0]}`;
    console.log(envFile)

    if (args.length !== 1) {
        console.error("Usage: node app.js <environment>");
        console.error("Defaulting to dev");
        envFile = `.env.dev`
    }

    dotenv.config({ path: `${__dirname}/${envFile}` });

    const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, PORT, SECRET } = process.env
    return {
        DB_HOST,
        DB_USER,
        DB_PASSWORD,
        DB_DATABASE,
        PORT,
        SECRET
    };
}

module.exports = { ...setupConfig() }