
INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales person', 30000, 1),
('Sales Manager', 35000, 1),
('Software Engineer', 40000, 2),
('Head Software Engineer', 45000, 2),
('Accountant', 50000, 3),
('Accountant Manager', 55000, 3);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Cameron', 'Stroup', 2, null),
('Hunter', 'Stroup', 4, null),
('Robert', 'Stroup', 6, null),
('Trent', 'Stroup', 1, 1),
('Susan', 'Current', 1, 1),
('Hil', 'Stroup', 3, 2),
('Colleen', 'Stroup', 3, 2),
('Lake', 'Goodboy', 1, 1),
('Christain', 'Current', 5, 3),
('Tiffany', 'Stroup', 5, 3);
