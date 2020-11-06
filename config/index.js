let connection = require('./connection');
let inquirer = require('inquirer');

class employee_db {
    constructor(connection) {
        this.connection = connection;
    }
}

function askUser() {
    inquirer
        .prompt([{
                message: "What would you like to do?",
                name: "choice",
                type: "list",
                choices: ["Add"]
            }

        ])
        .then()
}

askUser()

//call function for view, add, update
//function queries database show given table 
//switch case 

//require console.table

//make vs code change stuff in database
//controllers add/remover/update 
//two js folders: query to database
//index with inquiere
//queries with mysql