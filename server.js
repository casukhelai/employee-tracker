// declare dependencies
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
require('dotenv').config();
// const sequelize = require('./config/connection');

// create express app config
const app = express();
// set PORT
const PORT = process.env.PORT || 3001;
// set up env
const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Root',
        database: 'mainEmployee'
}
);

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// use the following if there are any static files to be used in this
// app.use(express.static(''));

// ******** inquirer prompts ********
const mainPrompt = () =>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ["ADD Department","ADD Employee","ADD Role",
                    "VIEW Department","VIEW Employee","VIEW Role",
                    "UPDATE Employee Roles"]
        }
    ])
    // create switch cases so that the choices are more strict for the appropriate case
    .then(data => { 
        switch(data.choice){
            case "ADD Department":
                addDepartment();
            break;
            case "ADD Employee":
                addEmployee();
            break;  
            case "ADD Role":
                addRole();
            break;  
            case "VIEW Department":
                viewDepartment();
            break;  
            case "VIEW Employee":
                viewEmployee();
            break;  
            case "VIEW Role":
                viewRole();
            break;     
            case "UPDATE Employee Role":
                updateEmployee();
            break;   
        }

    })
};

// ******** Supporting functions *********

// need an array to select the roles from
const roleSelection = () => {
    let rolesArr = [];
    // connection.query basically looks at the sql table
    connection.query('SELECT *  FROM role', (err,res) => {
        for(let i=0;i<res.length;i++){
            rolesArr.push(res[i].title)
        }
        if (err) throw err;
    });
    return rolesArr;
}

// Need a list to choose from the manager
const managerSelection = () => {
    let managersArr = [];
    connection.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NOT NULL', (err, res) => {
        for(let i=0;i<res.length;i++){
            managersArr.push(res[i].first_name);
        }
    });
    return managersArr;
}

// ******** MAIN Functions Called *********
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What department would you like to add?'
        }
    ])
    .then((response) => {
        // insert department name response into the data, creating a new row
        const query = 'INSERT INTO department SET ?';
        connection.query(query, {department: response.department}, (err, res) => {
            if(err) return err;
            console.log("\n DEPARTMENT ADDED...\n");
            mainPrompt();
        })
    });
};


const addRole = () => {
    connection.query('SELECT role.title AS title, role.salary AS salary FROM role', (err,res) => {
        if(err) return err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary?'
            }
        ])
        .then((response) => {
            // insert the values within the data set
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: response.title,
                    salary: response.salary,
                },
                console.table(response)
            );
        });
    })
    
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: 'firstName',
            message: "What's their first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What's their last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is their role?",
            choices: roleSelection()
        },
        {
            type: "list",
            name: "managerList",
            message: "What is their salary?",
            choices: managerSelection()
        }
        .then((data) => {
            // in case the role/manager id's are NULL, at least the FIRST index will be returned each time
            let roleID = roleSelection().indexOf(val.role) + 1;
            let managerID = managerSelection.indexOf(vale.managerList) +1;
            connection.query("INSERT INTO employee SET ?",
            {
                first_name: val.firstName,
                last_name: val.lastName,
                role_id: roleID,
                manager_id: managerID
            });
            (err) => err ? console.log(err) : console.table(data);
            mainPrompt();
        })

    ])
}

const viewDepartment = () => {
    connection.query('SELECT employee.first_name, employee.last_name, department.name AS Department')
}

// const viewEmployee = () => {

// }

// const viewRole = () => {

// }

// const updateEmployee = () => {

// }

// app listener
app.listen(PORT, () => console.log(`App listening on PORT ${3001}`));
module.exports = connection;