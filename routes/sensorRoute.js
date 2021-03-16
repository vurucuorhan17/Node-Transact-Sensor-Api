const router = require("express").Router();
const mysql = require("mysql");

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "sensorDataDB"
});

router.post("/addSensorDataToDb",(req,res) => {

    const { sensorName, sensorValue } = req.query;

    conn.getConnection((err,connection) => {
        const sql = `INSERT INTO sensordata (timestamp, sensorName, sensorValue) VALUES (NOW(),"${String(sensorName)}",${Number(sensorValue)})`;
        connection.query(sql, (err,rows) => {
            connection.release();
            if (err) throw err;
            res.send("Sensor data has added into database");
        });
    });

    /*conn.connect((err) => {
        if (err) throw err;
        console.log("Connected");
        conn.query(sql,(err,result) => {
            if (err) throw err;
            res.send("Sensor data has added into database");
        });
    });*/
});

router.get("/getAllSensorData",(req,res) => {
    conn.getConnection((err,connection) => {
        const sql = "SELECT * FROM sensordata";
        connection.query(sql, (err,result,fields) => {
            connection.release();
            if (err) throw err;
            res.send(result);
        });
    });
});

module.exports = router;
