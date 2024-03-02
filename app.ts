import apiRoutes from "./routes/api.routes";
 const express = require('express');

import router from "./routes/api.routes";

const app = express()
const port = 3000;


app.use(express.json());

// app.use('/',apiRoutes)

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

router.use('/', (req, res) => {
    res.status(200).json({message:"its working"})
})


//
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;
//
// app.use('/', (req, res) => {
//     res.status(200).json({ message: 'Hello, World! with request and response 4' });
// });
//
//
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });