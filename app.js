const express = require('express');
const apiRoutes = require("./routes/api.routes.js");
const { PORT } = require('./config/app.conf.js')
const multer = require('multer');

const app = express();
const upload = multer();

app.use(express.json());
app.use(upload.any())

app.use('/', apiRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


