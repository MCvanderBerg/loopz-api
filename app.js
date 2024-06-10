const express = require('express');
const apiRoutes = require("./routes/api.routes.js");
const { PORT } = require('./config/app.conf.js')
const multer = require('multer');

const app = express();
const upload = multer();

app.use(express.json());
app.use(upload.any())

app.use('/api', apiRoutes)

app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`);
});


