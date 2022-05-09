const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

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
const departments = [];
const rolesA = [];

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
          "Update Employees roles",
        ],
      },
    ])
    .then((answer) => {
      if (answer.question === "Add Department") {
        addDepartment();
      } else if (answer.question === "Add Employee") {
        employeeQuestions();
      } else if (answer.question === "Add Roles") {
        rolesQuestions();
      } else if (answer.question === "Add Department") {
        rolesQuestions();
      } else if (answer.question === "Show Departments") {
        showDepartments();
      } else if (answer.question === "Show Roles") {
        showRoles();
      } else if (answer.question === "Show Employees") {
        showEmployees();
      } else if (answer.question === "Update Employees roles") {
        updateEmployeeroless();
      } else {
        connection.end();
      }
    });
};

showDepartments = () => {
  const query = `SELECT * FROM department`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.log("VIEW DEPARTMENTS");
    console.table(data);
    mainMenu();
  });
};
showRoles = () => {
  const query = `SELECT * FROM roles
  LEFT JOIN department ON roles.department_id = department.id`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.log("VIEW ROLES");
    console.table(data);

    mainMenu();
  });
};

showEmployees = () => {
  const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.departmentN AS department, roles.salary FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN department on roles.department_id = department.id;`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.log("VIEW ALL EMPLOYEES");
    console.table(data);

    consoleTable;
    mainMenu();
  });
};
// Helper function to add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the deparment name?",
        name: "department",
      },
    ])
    .then(({ department }) => {
      // Run query to insert the department that the
      // user entered
      connection.query(
        "INSERT INTO department SET ?",
        {
          departmentN: department,
        },
        function (err) {
          if (err) throw err;
          console.log(`You successfully added department "${department}" !`);
          // Update departments list
          departments.push(department);

          // send user back to start menu
          mainMenu();
        }
      );
    });
};

rolesQuestions = () => {
  // Ask for title, salary, and department
  const dChoices = ["Sales", "Engineering", "Finance"];
  inquirer
    .prompt([
      {
        type: "list",
        message: "What deparment is this role in",
        name: "department",
        choices: dChoices,
      },
      {
        type: "number",
        message: "What is the salery",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the title?",
        name: "title",
      },
    ])
    .then((roles) => {
      // Run query to obtain the department
      // id of the department that the user chose
      connection.query(
        `SELECT id FROM department WHERE (department.departmentN = "${roles.department}")`,

        function (err, res) {
          if (err) throw err;

          // Run query to insert the title, salary,
          // and the obtained department id into
          // the role table
          connection.query(
            "INSERT INTO roles SET ?",
            {
              title: roles.title,
              salary: roles.salary,
              department_id: res[0].id,
            },

            function (err) {
              if (err) throw err;
              console.log(`The role "${roles.title}" has been added!`);
              console.log(
                `Role: ${roles.title}  || Salary: ${roles.salary} || Department: ${roles.department}`
              );
              // Update roles list
              rolesA.push(roles.title);

              dChoices.push(roles.department);
              // send user back to start menu
              mainMenu();
            }
          );
        }
      );
    });
};
employeeQuestions = () => {
  let rChoices = [
    "Sales Person",
    "Sales Manger",
    "Software Engineer",
    "Head Software Engineer",
    "Accountant",
    "Accountant Manager",
  ];

  let query = `SELECT * FROM roles`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    roleChoices = data.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
  });
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee first name",
        name: "firstname",
      },

      {
        type: "input",
        message: "Enter employee last name",
        name: "lastname",
      },
      {
        type: "list",
        message: "Enter what is their role? ",
        name: "role",
        choices: rChoices,
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: 1,
          manager_id: 1,
        },
        function (err, answer) {
          if (err) {
            throw err;
          }
        }
      );
      console.log("Employee added !");
      mainMenu();
    });
};

const updateEmployeeroless = () => {
  connection.query(
    "SELECT first_name, last_name FROM employees",
    (err, results) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices() {
              const choiceArray = [];
              results.forEach(({ first_name, last_name }, i) => {
                choiceArray.push({
                  name: `${first_name} ${last_name}`,
                  value: i + 1,
                });
              });
              return choiceArray;
            },
            message: "Which employee would you like to update?",
          },
          {
            name: "update",
            type: "list",
            message: "What do you need to update?",
            choices: ["Change title", "testing"],
          },
        ])
        .then((answer) => {
          changeTitle(answer.choices);
        });
    }
  );
};
const changeTitle = (employeeId) => {
  inquirer
    .prompt({
      name: "newTitle",
      type: "list",
      message: "Title: ",
      choices: [
        "1-Sales person.",
        "2-Sales Manager",
        "3-Software Engineer",
        "4-Head Software Engineer",
        "5-Acountant",
        "6-Accountant Manager",
      ],
    })
    .then((answer) => {
      connection.query(
        "UPDATE employees SET title_id=? WHERE id=?",
        [answer.newTitle.split("-")[0], employeesId],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          mainMenu();
        }
      );
    });
};
mainMenu();
