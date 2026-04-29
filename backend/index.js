import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fetch from "node-fetch";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { errorMonitor } from "events";
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });
const app=express();
app.set("view engine", "ejs");
app.set("views", join(__dirname, "..", "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port=3000;
async function getWeatherConditions(city) {
    const api_key=process.env.OPENWEATHER_API_KEY;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const response=await fetch(url);
    const data=await response.json();
    return data;
}
app.get("/",(req,res)=>{
    console.log("new get request!");
    res.sendFile(join(__dirname, "..", "frontend", "index.html"));
});
app.post("/submit",async (req,res)=>{
    console.log("new post request");
    const city = req.body.location?.trim();
    console.log(city);
    const data=await getWeatherConditions(city);
    console.log(data);
    res.render("index.ejs",{
        data
    })
});
app.listen(port,()=>{
    console.log("sever running on port "+port);
});