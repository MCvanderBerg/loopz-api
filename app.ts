import apiRoutes from "./routes/api.routes";
const express = require('express');

const app = express()
const port = 3000;


app.use(express.json());

app.use('/',apiRoutes)

app.listen(process.env.DB_PORT || port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});