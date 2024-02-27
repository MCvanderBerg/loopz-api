// import apiRoutes from "./routes/api.routes";
// const express = require('express');
//
// const app = express()
// const port = 3000;
//
//
// app.use(express.json());
//
// app.use('/',apiRoutes)
//
// app.listen(process.env.PORT || port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});