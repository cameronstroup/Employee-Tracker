const mysql = require("mysql");
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

// const mainMenu = () => {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "question",
//         message: "What would you like to do?",
//         choices: [
//           "Examine Departments",
//           "Examine Roles",
//           "Examine Employees",
//           "Add Department",
//           "Add Role",
//           "Add Employee",
//           "Update Employees",
//         ],
//       },
//     ])
//     .then((answer) => {
//       if (answer.question === "Add Department") {
//         addDepartment();
//       } else if (answer.question === "Add Employees") {
//         employeeQuestions();
//       } else if (answer.question === "Add Role") {
//         roleQuestions();
//       } else if (answer.question === "Add Department") {
//         roleQuestions();
//       } else if (answer.question === "Examine Departments") {
//         ExamineDepartments();
//       } else if (answer.question === "Examine Roles") {
//         ExamineRoles();
//       } else if (answer.question === "Examine Employees") {
//         ExamineEmployees1();
//       } else if (answer.question === "Update Employee Role") {
//         updateEmployeeRoles();
//       } else {
//         connection.end();
//       }
//     });
// };

// // const addDepartment= ()=> {
// //     inquirer.prompt([
// //         {
// //             type: 'input',
// //             name: "deparment",
// //             message: "Enter the name of the daparment you want to add"

// //         }
// //     ])
// //     .then(answers=> {
// //         const deptQuerry= INSERT INTO deparment (deparment)VALUES(`${answers.deparment}`))
// //     }

// // }

// // mainMenu();
