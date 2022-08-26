//5d15d09cacaa8f2ffa788844e90bea81
//https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=5d15d09cacaa8f2ffa788844e90bea81

const http = require('http');
const fs = require('fs');

const homeFile = fs.readFileSync("home.html","utf-8");

// const server