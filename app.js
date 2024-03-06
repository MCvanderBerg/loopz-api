import express from 'express';
import apiRoutes from "./routes/api.routes.js";

import 'dotenv/config'
import multer from 'multer';


const app = express();
const upload = multer();

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(upload.any())

app.use('/api', apiRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


