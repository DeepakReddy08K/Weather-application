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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port=3000;
async function getCityCoordinates(city) {
    const api_key=process.env.GEOCODE_API_KEY;
    const url=`http://api.positionstack.com/v1/forward?access_key=${api_key}&query=${city}`;
    const response=await fetch(url);
    const data=await response.json();
    console.log("Number of citys found ="+data.data.length);
      if (data.data.length === 0) {
         return "error";
     }
     let latitude=data.data[0].latitude;
     let longitude=data.data[0].longitude;
     return {latitude,longitude};
}
app.get("/",(req,res)=>{
    console.log("new get request!");
    res.sendFile(join(__dirname, "..", "frontend", "index.html"));
});
app.post("/submit",(req,res)=>{
    console.log("new post request");
    let city=req.body.location;
    console.log(city);
    const coordiants=getCityCoordinates(city);
    if(coordiants==="error"){
        console.log("error");
        res.send("<h1>Sorry</h1>");
    }
    else res.send("<h1>Thank you</h1>");
});
app.listen(port,()=>{
    console.log("sever running on port "+port);
});