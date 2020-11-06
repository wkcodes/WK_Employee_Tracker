// Set up MySQL connection.
var mysql = require("mysql");
// Set up util
var util = require("util");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "S278K143FSQ",
  database: "employee_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

connection.query=util.promisify(connection.query);

// Export connection for our ORM to use.
module.exports = connection;

//check tables in myqsl workbench
//run select *
//view the data
//add the data (querires)
//inquiere prompts 
//inquierer.prompt 
