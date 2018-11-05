const fs = require("fs")
const script = require('./script_generator')
var mysql = require('mysql');
var con;

function connect(config) {
  let conf = JSON.parse(fs.readFileSync(config).toString())
  conf.multipleStatements = true
  con = mysql.createConnection(conf);
}

const StartDB = (config, db) => {
  if(!con) {
    connect(config)
  }

  let json = fs.readFileSync(db)
  json = json.toString()
  json = JSON.parse(json)
  console.log(script.buildScript(json));

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    let query = script.buildScript(json);
    con.query(query, (err, result) => {
      if (err) throw err;
      console.log(result);
    })
  });
}

const Create = (config, file) => {
  if(!con) {
    connect(config)
  }

  let obj = JSON.parse(fs.readFileSync(file).toString())
  let query = script.generateInsert(obj.table, obj.values)

  con.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  })
}

const Read = (config, file) => {
  if(!con) {
    connect(config)
  }

  let obj = JSON.parse(fs.readFileSync(file).toString())
  let query = script.generateSelect(obj.table, obj.values)

  con.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  })
}

const Update = (config, file) => {
  if(!con) {
    connect(config)
  }

  let obj = JSON.parse(fs.readFileSync(file).toString())
  let query = script.generateUpdate(obj.table, obj.values, obj.condition)

  con.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  })
}

const Delete = (config, file) => {
  if(!con) {
    connect(config)
  }

  let obj = JSON.parse(fs.readFileSync(file).toString())
  let query = script.generateDelete(obj.table, obj.values)

  con.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  })
}

module.exports = { StartDB, Create, Read, Update, Delete }