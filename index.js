const fs = require("fs")
var mysql = require('mysql');
var con = mysql.createConnection(JSON.parse(fs.readFileSync('config.json').toString()));

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});