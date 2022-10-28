const express = require("express");

const app = express();
const port = process.env.APP_PORT || 5000;

app.get("/", (req, res) => res.send("Merhaba Vatandaş"));
app.listen(port, () => console.log("Uygulama ayağa kalktı."));
