const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();

// Configure db connection
const db = mysql.createConnection({
  host: process.env.HOST,
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
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
    .prompt({
      message: "What would you like to do?",
      name: "mainChoice",
      type: "list",
      choices: ["Add", "View", "Update"],
    })
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

//Choices of what to add to the db
function addToDatabase() {
  console.log("adding...");
  inquirer
    .prompt({
      name: "addChoice",
      type: "list",
      message: "choose what you want to add: ",
      choices: ["Departments", "Employees", "Roles"],
    })
    .then((response) => {
      switch (response.addChoice) {
        case "Departments":
          addDepartment();
          break;
        case "Employees":
          addEmployee();
          break;
        case "Roles":
          addRole();
          break;
      }
    });
}

//Add a department to the db
function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter the name of your new department: ",
    })
    .then((response) => {
      db.query(
        "INSERT INTO department SET ?",
        {
          name: response.department,
        },
        (err, res) => {
          if (err) throw err;
          console.log("New department added successfully")
          mainPrompt();
        }
      );
    });
}

//Add a role to the db
function addRole() {
  // query db for all departments
  db.query("SELECT * FROM department", (err,results) => {
    if(err) throw err;
    // get user input for the new role
  inquirer
    .prompt([
      {
        name: "department",
        type: "rawlist",
        choices: ()=> {
          let deptChoices = [];
          for(let i = 0; i < results.length; i++) {
            deptChoices.push(results[i].name);
          }
          return deptChoices;
        },
        message: "Select department for new role: "
      },
      {
        name: "title",
        type: "input",
        message: "Enter the title for new role: ",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter salary for new role: "
      },

    ])
    .then((response) => {
      //get id for selected department
      console.log(response.department.choices)
      let chosenDepartment;
      for(i = 0; i < results.length; i++){

      }

    });
  });
}

//Add an employee to the db 

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
            console.table(rows);
            mainPrompt();
          });
          break;
        case "Employees":
          db.query("SELECT * FROM employee", (err, rows) => {
            if (err) throw err;
            console.table(rows);
            mainPrompt();
          });
          break;
        case "Roles":
          db.query("SELECT * FROM role", (err, rows) => {
            if (err) throw err;
            console.table(rows);
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
