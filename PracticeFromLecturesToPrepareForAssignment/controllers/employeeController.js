
const {writeFile} = require("fs");

const data = {
  employees: require("../model/employees.json"),
  setEmployees(data) {
    this.employees = data;

    var jsonArray = [];
        for (i in data) {
            jsonArray.push(data[i]);
        }
        writeFile("model/employees.json", JSON.stringify(jsonArray), "utf-8", function(err){
          if (err) throw err;
          console.log('Data Saved!');
        });
  }
};

//Get all employees
const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

//Create an employee
const createNewEmployee = (req, res) => {
  const newId = data.employees?.length
    ? data.employees[data.employees.length - 1].id + 1
    : 1;
  const newEmployee = {
    id: newId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and Last names are required" });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);

};

//Update an employee
const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ${req.body.id} is not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  const unsortedArray = [...filteredArray, employee];

  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

//Delete an employee
const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ${req.body.id} is not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};
//Get an employee
const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee with ID of ${req.params.id} is not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
