const mysql = require("mysql2");
const inquirer = require("inquirer");
require('dotenv').config()

// Configure db connection
const db = mysql.createConnection({
  host: process.env.HOST,
  port: 3306,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "employee_db",
});
console.log(process.env.HOST)
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
    .prompt([
      {
        message: "What would you like to do?",
        name: "mainChoice",
        type: "list",
        choices: ["Add", "View", "Update"],
      },
    ])
    .then((response) => {
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
    });
}

function addToDatabase() {
  console.log("adding...");
  inquirer
    .prompt({
      name: "addChoice",
      typee: "list",
      message: "choose what you want to add: ",
      choices: ["Departments", "Employees", "Roles"],
    })
    .then((response) => {
      switch (response.addChoice) {
        case "Departments":
          addDepartments();
          break;
        case "Employees":
          addEmployees();
          break;
        case "Roles":
          addRoles();
          break;
      }
    });
}

function addDepartments() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter the name of your new department: ",
    })
    .then((response) => {
      db.query("INSERT INTO department (name) values ?", { department: response.department}, (err, res) => {
        if (err) throw err;
        addToDatabase();
      })
    })
}

//Function for returning database info to the user
function viewDatabase() {
  inquirer
    .prompt({
      name: "viewChoice",
      type: "list",
      message: "choose what you want to view: ",
      choices: ["Departments", "Employees", "Roles"],
    })
    .then((response) => {
      switch (response.viewChoice) {
        case "Departments":
          db.query("SELECT * FROM department", (err, rows) => {
            if (err) throw err;
            console.log(rows);
            mainPrompt();
          });
          break;
        case "Employees":
          db.query("SELECT * FROM employee", (err, rows) => {
            if (err) throw err;
            console.log(rows);
            mainPrompt();
          });
          break;
        case "Roles":
          db.query("SELECT * FROM roles", (err, rows) => {
            if (err) throw err;
            console.log(rows);
            mainPrompt();
          });
          break;
      }
    });
}

//check tables in myqsl workbench
//run select *
//view the data
//add the data (querires)
//inquiere prompts
//inquierer.prompt
