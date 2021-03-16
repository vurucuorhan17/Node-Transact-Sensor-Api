const express = require("express");

const app = express();

const sensorRoute = require("./routes/sensorRoute");

app.use("/",sensorRoute);

const host = "127.0.0.1";
const port = "3000";

app.listen(port, host, () => console.log(`Sunucu ${host}:${port} üzerinde çalışıyor...`));

