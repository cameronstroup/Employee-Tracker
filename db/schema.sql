DROP DATABASE IF EXISTS mycompanyDb;
CREATE DATABASE mycompanyDb;
USE mycompanyDb;



CREATE TABLE department (
      id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT(10) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT(10) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10),
    PRIMARY KEY (id)
)