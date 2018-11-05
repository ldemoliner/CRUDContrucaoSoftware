const fs = require("fs")

function createTable(table_name) {
  return `CREATE TABLE ${table_name};\n`
}

function addField(table_name, field_name, field_type) {
  return `ALTER TABLE ${table_name} ADD ${field_name} ${field_type};\n`
}

function addForeignKey(table_name, field_name, other_table_name, other_table_field) {
  return `ALTER TABLE ${table_name} ADD FOREIGN KEY ${field_name} REFERENCES ${other_table_name}(${other_table_field});\n`
}

function addPrimaryKey(table_name, field_names) {
 return `ALTER TABLE ${table_name} ADD PRIMARY KEY (${field_names.toString()});\n`
}

function addUnique(table_name, field_name) {
  return `ALTER TABLE ${table_name} ADD UNIQUE (${field_name});\n`
}

function translateTypes(type) {
  switch(type) {
    case 'number': return 'INT()'
    case 'date': return 'TIMESTAMP()'
    case 'string': return 'VARCHAR(255)'
  }
}

let json = fs.readFileSync('example.json')
json = json.toString()
json = JSON.parse(json)

console.log(json)

let creation = ""
for(let p in json) {
  console.log(p);
  console.log(json[p]);
  creation += createTable(p);
  for(let field in json[p]) {
    console.log(field);
    switch(field) {
      case 'pk':
        creation += addPrimaryKey(p, json[p][field])
        break

      case 'relations':
        if()
        for(let rel of json[p][field]) {
          console.log('----------------------');
          console.log(rel);
          creation += addForeignKey(p, rel.key, rel.table, rel.key)
        }
        break
      
      default:
        creation += addField(p, field, translateTypes(json[p][field]))
      }
  }
}

console.log(creation);

// for(let o of json) {
//  console.log(o)
// }

// function insertInto(table_name, )