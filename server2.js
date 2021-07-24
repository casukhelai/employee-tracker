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

// ******** Functions Called *********
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What department would you like to add?'
        }
    ])
    .then((response) => {
        const query = 'INSERT INTO department SET ?';
        connection.query(query, {department: response.department}, (err, res) => {
            if(err) return err;
            consolve.log("\n DEPARTMENT ADDED...\n");
            mainPrompt();
        })
    });
};

const addRole = () => {
    connection.query('SELECT role.title AS title, role.salary AS salary FROM role', (err, res) => {
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
            const query = connection.query('INSERT INTO role SET ?',
            {
                title: response.title,
                salary: response.salary
            },
            (err) => err ? console.log(err) : console.log("successfully added role!"))
        });
    })
    
}

const addEmployee = () => {

}

const viewDepartment = () => {

}

const viewEmployee = () => {

}

const viewRole = () => {

}

const updateEmployee = () => {

}

// app listener
app.listen(PORT, () => console.log(`App listening on PORT ${3001}`));
module.exports = connection;