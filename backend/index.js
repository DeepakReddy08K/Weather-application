import express from "express";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port=3000;

app.get("/",(req,res)=>{
    console.log("new get request!");
    res.sendFile(join(__dirname, "..", "frontend", "index.html"));
});
app.post("/submit",(req,res)=>{
    console.log("new post request");
    console.log(req.body);
    res.send("<h1>Thank you</h1>");
});
app.listen(port,()=>{
    console.log("sever running on port "+port);
});