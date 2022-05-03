const mysql = require("mysql2");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "mycompanyDb",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "question",
        message: "What would you like to do?",
        choices: [
          "Show Departments",
          "Show Roles",
          "Show Employees",
          "Add Department",
          "Add Roles",
          "Add Employee",
          "Update Employees",
        ],
      },
    ])
    .then((answer) => {
      if (answer.question === "Add Department") {
        addDepartment();
      } else if (answer.question === "Add Employees") {
        employeeQuestions();
      } else if (answer.question === "Add Roles") {
        rolesQuestions();
      } else if (answer.question === "Add Department") {
        rolesQuestions();
      } else if (answer.question === "Show Departments") {
        showDepartments();
      } else if (answer.question === "Show Roles=s") {
        showroless();
      } else if (answer.question === "Show Employees") {
        showEmployees();
      } else if (answer.question === "Update Employee roles") {
        updateEmployeeroless();
      } else {
        connection.end();
      }
    });
};

ShowEmployees = () => {
  const query = `SELECT employees.role_id, employees.first_name, employees.last_name, roles.title, department.department AS department
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id  
    LEFT JOIN department ON roles.department_id = department.id
    `;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.log("\n");
    console.log("VIEW ALL EMPLOYEES");
    console.log("\n");
    console.table(data);
    console.log("\n");
    inquirerPrompt();
  });
};

ShowDepartments = () => {
  const query = `SELECT * FROM department`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.log("\n");
    console.log("VIEW DEPARTMENTS");
    console.log("\n");
    console.table(data);
    console.log("\n");
    mainMenu();
  });
};
viewRoles = () => {
  const query = `SELECT * FROM role
    LEFT JOIN department ON role.department_id = department.id`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.log("\n");
    console.log("VIEW ROLES");
    console.log("\n");
    console.table(data);
    console.log("\n");
    inquirerPrompt();
  });
};
// function ShowEmployees() {
//   const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department AS department
//     FROM employees
//     LEFT JOIN roles ON employees.roles_id = roles.id
//     LEFT JOIN department ON roles.department_id = department.id
//     `;
//   connection.query(query, (err, data) => {
//     if (err) throw err;
//     console.log("\n");
//     console.log("VIEW ALL EMPLOYEES");
//     console.log("\n");
//     console.table(data);
//     console.log("\n");
//     mainMenu();
//   });
// }

// const addDepartment= ()=> {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: "deparment",
//             message: "Enter the name of the daparment you want to add"

//         }
//     ])
//     .then(answers=> {
//         const deptQuerry= INSERT INTO deparment (deparment)VALUES(`${answers.deparment}`))
//     }

// }

mainMenu();
