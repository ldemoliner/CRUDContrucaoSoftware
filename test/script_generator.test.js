var assert = require('assert');
var expect = require('expect.js');
const script = require('../script_generator')

describe('Script Generator', function() {
  describe('#createSchema()', function() {
    it('should return the sql schema creation', function() {
      assert.equal(script.createSchema("teste"), "CREATE SCHEMA teste;\n");
    });
  });
  describe('#createTable()', function() {
    it('should return the sql table creation', function() {
      expect(script.createTable("teste","tabelaUM")).to.contain("CREATE TABLE `teste`.`tabelaUM`");
    });
  })
  describe('#addField()', function() {
    it('should return the sql script to alter the table and add the field', function() {
      expect(script.addField("teste","tabelaUM","teste","number")).to.contain("ALTER TABLE `teste`.`tabelaUM` ADD teste number;\n");
    });
  })
  describe('#addForeignKey()', function() {
    it('should return the sql script to alter the table and add the field', function() {
      expect(script.addForeignKey("teste","tabelaUM","teste","tabelaDOIS","outroTESTE"))
      .to.contain("ALTER TABLE `teste`.`tabelaUM` ADD FOREIGN KEY (teste) REFERENCES `teste`.`tabelaDOIS`(outroTESTE);\n");
    });
  })
  describe('#addPrimaryKey()', function() {
    it('should return the sql script to alter the table and add the field', function() {
      expect(script.addPrimaryKey("teste","tabelaUM","teste"))
      .to.contain("ALTER TABLE `teste`.`tabelaUM` ADD PRIMARY KEY (teste);\n");
    });
  })
});
