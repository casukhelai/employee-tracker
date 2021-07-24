--  Schema for SQL database
DROP DATABASE IF EXISTS mainEmployee;

-- Create database
CREATE DATABASE mainEmployee;
USE mainEmployee;

-- Create new table for DEPARTMENT
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT, 
    PRIMARY KEY (id)
    FOREIGN KEY (department_id) REFERENCES department(id)
)
-- New table for employee
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(title),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
)