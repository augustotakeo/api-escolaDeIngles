const express = require("express");
const router = require('./routes');

const app = express();
app.use(express.json());

router(app);

const port = 3000;
app.listen(port, () => console.log("Api está funcionando"));