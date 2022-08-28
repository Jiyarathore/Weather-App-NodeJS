//5d15d09cacaa8f2ffa788844e90bea81
//https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=5d15d09cacaa8f2ffa788844e90bea81

const http = require('http');
const fs = require('fs');
const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");
//homefile me apana sara data h 
//niche jo replaceVal bana h useme 2 values pass hui h replaceVal((homeFile,val)) jiska function banaya tho usme tempVal pas kiya i.e. usme homeFile ki cheeze h and orgVal bhi parameter pass kiya h 

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    //replace function is being called to replace old tempval in html by our data's temp  

    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    return temperature;
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=5d15d09cacaa8f2ffa788844e90bea81"
        )
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk);
                const arrData = [objdata];
                // console.log(arrData);
                // console.log(arrData[0].main.temp);
                //By map method to call data
                const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join(" ");
                res.write(realTimeData);
                // console.log(realTimeData);
            })
            .on("end", (err) => {
                if (err) return console.log("connection closed due to errors", err);

                // console.log("end");
                res.end();
            });
    }
});

server.listen(8000, "127.0.0.1");