{ StartDB, Create, Read, Update, Delete }

StartdDB(config:database access config file,db:database model description):void

Create(config:database access config file,file:json with model values):void

Read(config:database access config file,file:json with table and desired fields):void

Update(config:database access config file,file:json with table name, new model values and condition):void

Delete(config:database access config file,file:json with table name and condition):void



StartDB 

	config example :
			{
			  "host": "localhost",
			  "user": "root",
			  "password": "senha",
			  "database": "vendas"
			}

	db model example:

			{
			  "vendas": {
			    "pedido": {
			      "numero": "number",
			      "data": "date",
			      "nome": "string",
			      "pk": ["numero"],
			      "relations": []
			    },
			    "produto": {
			      "codigo": "number",
			      "descricao": "string",
			      "preco": "number",
			      "pk": ["codigo"],
			      "relations": []
			    },
			    "pedido_produto": {
			      "numero": "number",
			      "codigo": "number",
			      "quantidade": "number",
			      "pk": ["numero", "codigo"],
			      "relations": [
				{ "table": "pedido",  "key": "numero" },
				{ "table": "produto", "key": "codigo" }
			      ]
			    }
			  }

Create 

	
	config example :
			{
			  "host": "localhost",
			  "user": "root",
			  "password": "senha",
			  "database": "vendas"
			}

	json example:
			{
			  "table": "pedido",
			  "values": {
			    "numero": "1",
			    "data": "2018-03-03",
			    "nome": "teste"
			  }
			}


Read 

	
	config example :
			{
			  "host": "localhost",
			  "user": "root",
			  "password": "senha",
			  "database": "vendas"
			}
	json example:
			{
			  "table": "pedido",
			  "values": ["numero", "data", "nome"]
			}
Update

	config example :
			{
			  "host": "localhost",
			  "user": "root",
			  "password": "senha",
			  "database": "vendas"
			}
	json example:
	
			{
			  "table": "pedido",
			  "values": {
			    "nome": "teste2"
			  },
			  "condition": {
			    "numero": 1
			  }
			}
Delete
	config example :
			{
			  "host": "localhost",
			  "user": "root",
			  "password": "senha",
			  "database": "vendas"
			}
	json example:
	
			{
			  "table": "pedido",
			  "values": {
			    "numero": "1"
			  }
			}

