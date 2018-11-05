const fs = require("fs")
var mysql = require('mysql');
var con = mysql.createConnection(JSON.parse(fs.readFileSync('config.json').toString()));

'



let json = fs.readFileSync('example.json')
json = json.toString()
json = JSON.parse(json)

console.log(buildScript(json));


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});