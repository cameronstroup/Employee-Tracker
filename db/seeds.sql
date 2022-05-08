
INSERT INTO department (departmentN)
VALUES
('Sales'),
('Engineering'),
('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales person', 40000, 1),
('Sales Manager', 75000, 1),
('Software Engineer', 90000, 2),
('Head Software Engineer', 99000, 2),
('Accountant', 50000, 3),
('Accountant Manager', 70000, 3);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Cameron', 'Stroup', 1, 1),
('Hunter', 'Stroup', 2, 1),
('Robert', 'Stroup', 2, 1),
('Trent', 'Stroup', 4, 1),
('Susan', 'Current', 5, 3),
('Hil', 'Stroup', 3, 2),
('Colleen', 'Stroup', 3, 2),
('Lake', 'Goodboy', 3, 2),
('Christain', 'Current', 6, 3),
('Tiffany', 'Stroup', 3, 2)

