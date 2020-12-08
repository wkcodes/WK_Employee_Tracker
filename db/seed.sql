INSERT INTO department(name) values("management");
INSERT INTO department(name) values("boh");
INSERT INTO department(name) values("foh");

INSERT INTO role(title,salary,department_id) values("gm","70000",1);
INSERT INTO role(title,salary,department_id) values("chef","50000",2);
INSERT INTO role(title,salary,department_id) values("server","30000",3);

INSERT INTO employee(first_name,last_name,role_id,manager_id) values("Bob","Boberts",1,null);
INSERT INTO employee(first_name,last_name,role_id,manager_id) values("Sharon","Stevenson",2,1);
INSERT INTO employee(first_name,last_name,role_id,manager_id) values("Howard","Handley",3,1);