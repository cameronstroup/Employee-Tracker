
INSERT INTO department (name)
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
('Cameron', 'Stroup', 1, null),
('Hunter', 'Stroup', 2, null),
('Robert', 'Stroup', 2, null),
('Trent', 'Stroup', 4, 1),
('Susan', 'Current', 5, 1),
('Hil', 'Stroup', 3, 2),
('Colleen', 'Stroup', 3, 2),
('Lake', 'Goodboy', 3, 1),
('Christain', 'Current', 6, 3),
('Tiffany', 'Stroup', 3, 3);
