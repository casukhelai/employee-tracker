// declare dependencies
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();
// const sequelize = require('./config/connection');

// create express app config
const app = express();
// set PORT
const PORT = process.env.PORT || 3001;
// set up env
const connection = new createConnection(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// use the following if there are any static files to be used in this
// app.use(express.static(''));

// inquirer


// app listener
app.listen(PORT, () => console.log(`App listening on PORT ${3001}`));
module.exports = connection;