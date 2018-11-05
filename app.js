const fs = require("fs")

function createSchema(schema_name) {
  return `CREATE SCHEMA ${schema_name}\n`
}

function createTable(schema_name, table_name) {
  return `CREATE TABLE \`${schema_name}\`.\`${table_name}\`;\n`
}

function addField(schema_name, table_name, field_name, field_type) {
  return `ALTER TABLE \`${schema_name}\`.\`${table_name}\` ADD ${field_name} ${field_type};\n`
}

function addForeignKey(schema_name, table_name, field_name, other_table_name, other_table_field) {
  return `ALTER TABLE \`${schema_name}\`.\`${table_name}\` ADD FOREIGN KEY ${field_name} REFERENCES \`${schema_name}\`.\`${other_table_name}\`(${other_table_field});\n`
}

function addPrimaryKey(schema_name, table_name, field_names) {
 return `ALTER TABLE \`${schema_name}\`.\`${table_name}\` ADD PRIMARY KEY (${field_names.toString()});\n`
}

function addUnique(schema_name, table_name, field_name) {
  return `ALTER TABLE \`${schema_name}\`.\`${table_name}\` ADD UNIQUE (${field_name});\n`
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
for(let schema in json) {
  creation += createSchema(schema)
  for(let table in json[schema]) {
    console.log(table);
    console.log(json[schema][table]);
    creation += createTable(schema, table);
    for(let field in json[schema][table]) {
      console.log(field);
      switch(field) {
        case 'pk':
          creation += addPrimaryKey(schema, table, json[schema][table][field])
          break
  
        case 'relations':
          for(let rel of json[schema][table][field]) {
            creation += addForeignKey(schema, table, rel.key, rel.table, rel.key)
          }
          break
        
        default:
          creation += addField(schema, table, field, translateTypes(json[schema][table][field]))
        }
    }
  }
}

console.log(creation);