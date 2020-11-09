const mysql = require("mysql");
const inquirer = require("inquirer")
const util = require("util");

// Configure db connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "S278K143FSQ",
  database: "employee_db"
});

// Make db connection.
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to employee CMS as id: " + db.threadId);
  // Run the main user prompt function
  mainPrompt();
});

// Main user prompt
function mainPrompt() {
  inquirer
    .prompt([{
      message: "What would you like to do?",
      name: "mainChoice",
      type: "list",
      choices: ["Add", "View", "Update"]
    }])
    .then(response => {

      switch (response.mainChoice) {
        case "Add":
          addToDatabase();
          break;
        case "View":
          viewDatabase();
          break;
        case "Update":
          updateDatabase();
          break;

      }

    })
}

function addToDatabase() {
  console.log("adding...")
  /* inquirer
    .prompt(
      {
        name: ""
      }
    ) */
  //add to database 
  //db.query('')
}

function viewDatabase() {
  inquirer
    .prompt({
      name: "viewChoice",
      type: "list",
      message: "choose what you want to view: ",
      choices: ["Departments", "Employees", "Roles"]
    }).then(response => {
      switch (response.viewChoice) {
        case "Departments":
          db.query('SELECT * FROM department', (err, rows) => {
            if (err) throw err;
            console.log(rows);
            mainPrompt();
          });
          break;
        case "Employees":
          db.query('SELECT * FROM employee', (err, rows) => {
            if (err) throw err;
            console.log(rows);
            mainPrompt();
          });
          break;
        case "Roles":
          db.query('SELECT * FROM roles', (err, rows) => {
            if (err) throw err;
            console.log(rows);
            mainPrompt();
          });
          break;
      }
    })
}


//check tables in myqsl workbench
//run select *
//view the data
//add the data (querires)
//inquiere prompts 
//inquierer.prompt 