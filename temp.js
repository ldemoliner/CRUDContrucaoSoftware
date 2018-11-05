var test = require("./index")

test.StartDB('config.json', 'db.json')

test.Create('config.json', 'create.json')

test.Read('config.json', 'read.json')

test.Update('config.json', 'update.json')

test.Delete('config.json', 'delete.json')