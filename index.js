//5d15d09cacaa8f2ffa788844e90bea81
//https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=5d15d09cacaa8f2ffa788844e90bea81

const http = require('http');
const fs = require('fs');
const requests= require("requests");

const homeFile = fs.readFileSync("home.html","utf-8");

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=5d15d09cacaa8f2ffa788844e90bea81"
        )
        .on("data", (chunk) =>{
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            // console.log(arrData);
            console.log(arrData[0].main.temp);
        })
        .on("end",(err)=>{
            if (err) 
            return console.log("connection closed due to errors",err);

            console.log("end");
        })
    }
});

server.listen(8000, "127.0.0.1");