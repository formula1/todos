
const TABLE_NAME = "TODO";

const createTable = function(){
  return `
  CREATE TABLE ${TABLE_NAME} (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      owner varchar(255) NOT NULL,
      description TEXT NOT NULL,
      created INT NOT NULL,
      finished INT NOT NULL
  );`
}


const database = {
  "createItem": function(user, input){
    return `database
      INSERT INTO ${TABLE_NAME} (owner, description, created, finished)
      VALUES ('${user.id}', '${input.description}', ${Date.now()}, 0);
    `;
  },
  "requestItem": {
    "list": function(user, input){
      return `SELECT * FROM ${TABLE_NAME} WHERE owner = '${user.id}';`
    },
    "single": function(user, input){
      return `SELECT * FROM ${TABLE_NAME} WHERE id = ${input.id};`
    }
  },
  "updateItem": {
    "finishItem": function(user, input){
      return `UPDATE ${TABLE_NAME} SET finished = ${Date.now()} WHERE id = ${input.id};`;
    }
  },
  "deleteItem": function(user, input){
    return ` DELETE FROM ${TABLE_NAME} WHERE id= ${input.id};`;
  }
}
