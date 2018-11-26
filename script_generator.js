//Cria um esquema passando o nome dele
function createSchema(schema_name) {
  return `CREATE SCHEMA ${schema_name};\n`
}

//Cria uma tabela, passando o nome do esquema e o nome da tabela
function createTable(schema_name, table_name) {
  return `CREATE TABLE \`${schema_name}\`.\`${table_name}\`(creation_date DATE DEFAULT '${new Date().toJSON().slice(0, 10)}');\n`
}

//Adiciona um campo na tabela, é necessário informar o nome do schema, nome da tabela, nome do campo e tipo do campo
function addField(schema_name, table_name, field_name, field_type) {
  return `ALTER TABLE \`${schema_name}\`.\`${table_name}\` ADD ${field_name} ${field_type};\n`
}

//Adiciona uma chave estrangeira, é necessário informar o nome do schema, nome da tabela, nome do campo, nome da segunda tabela e nome do outro campo da segunda tabela
function addForeignKey(schema_name, table_name, field_name, other_table_name, other_table_field) {
  return `ALTER TABLE \`${schema_name}\`.\`${table_name}\` ADD FOREIGN KEY (${field_name}) REFERENCES \`${schema_name}\`.\`${other_table_name}\`(${other_table_field});\n`
}

//Adiciona uma chave primária, é necessário informar o nome do schema, nome da tabela e nome do campo
function addPrimaryKey(schema_name, table_name, field_names) {
  return `ALTER TABLE \`${schema_name}\`.\`${table_name}\` ADD PRIMARY KEY (${field_names.toString()});\n`
}

//Adiciona um campo único que não pode ter valores repetidos, é necessário informar o nome do schema, nome da tabela e nome do campo
function addUnique(schema_name, table_name, field_name) {
  return `ALTER TABLE \`${schema_name}\`.\`${table_name}\` ADD UNIQUE (${field_name});\n`
}

//Gera um insert, é necessário informar o nome da tabela e o dicionário chave valor
const generateInsert = (table_name, dict) => {
  return `INSERT INTO ${table_name} (${Object.keys(dict)}) VALUES(${Object.values(dict).map(x => `'${x}'`)});\n`
}

//Gera um delete, é necessário informar o nome da tabela e o dicionário chave valor
const generateDelete = (table_name, dict) => {
  return `DELETE FROM ${table_name} WHERE ${Object.keys(dict)} = ${Object.values(dict)} ;\n`
}

//Gera um select, é necessário informar o nome da tabela e o dicionário chave valor
const generateSelect = (table_name, dict) => {
  if (!dict)
    return `SELECT * FROM ${table_name};\n`
  else
    return `SELECT ${dict} FROM ${table_name};\n`
}

//Gera um update, é necessário informar o nome da tabela e o dicionário chave valor e uma condição
const generateUpdate = (table_name, dict, condition) => {
  return `UPDATE ${table_name} SET ${Object.entries(dict).map(([key, value]) => `${key} = '${value}'`)} where ${Object.entries(condition).map(([key, value]) => `${key} = ${value}`)};\n`
}

//Função que 'traduz' os campos informados para serem mapeados no banco, é necessário informar o tipo dele
function translateTypes(type) {
  switch (type) {
    case 'number': return 'INT'
    case 'date': return 'DATE'
    case 'string': return 'VARCHAR(255)'
  }
}

//Gera o script de build
const buildScript = (json_obj) => {
  let creation = ""
  for (let schema in json_obj) {
    // creation += createSchema(schema)
    for (let table in json_obj[schema]) {
      // console.log(table);
      // console.log(json_obj[schema][table]);
      creation += createTable(schema, table);
      for (let field in json_obj[schema][table]) {
        // console.log(field);
        switch (field) {
          case 'pk':
            creation += addPrimaryKey(schema, table, json_obj[schema][table][field])
            break

          case 'relations':
            for (let rel of json_obj[schema][table][field]) {
              creation += addForeignKey(schema, table, rel.key, rel.table, rel.key)
            }
            break

          default:
            creation += addField(schema, table, field, translateTypes(json_obj[schema][table][field]))
        }
      }
    }
    creation += `USE \`${schema}\`;\n`
  }

  return creation
}

// let json = fs.readFileSync('example.json')
// json = json.toString()
// json = JSON.parse(json)

// console.log(buildScript(json));

module.exports = { generateDelete, generateInsert, generateSelect, generateUpdate, buildScript,createSchema,createTable,addField,addForeignKey,addPrimaryKey,addForeignKey,addUnique }

