const express = require("express");
const app = express();

app.use(express.json());

const employees = [
  { id: 1, name: "Pratik", role: "Software Developer", salary: 60000 },
  { id: 2, name: "Ankit", role: "Frontend Developer", salary: 55000 },
  { id: 3, name: "Riya", role: "Backend Developer", salary: 65000 },
  { id: 4, name: "Sneha", role: "QA Engineer", salary: 50000 },
  { id: 5, name: "Rahul", role: "DevOps Engineer", salary: 70000 }
];

// GET route to return all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employee/:id", (req, res) => {
  const id = parseInt(req.params.id); // string → number
  const employee = employees.find(emp => emp.id === id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

app.post("/employee", (req, res) =>{
    const emp = req.body;
    employees.push(emp)
    res.json({message : "Employee added" , employee : emp})
});

app.put("/employee/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const index = employees.findIndex(emp => emp.id === id);

  if (index !== -1) {
    employees[index] = { ...employees[index], ...updatedData };
    res.json({ message: "Employee updated", employee: employees[index] });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

app.delete("/employee/:id", (req, res) =>{

    const id = parseInt(req.params.id);
    const index = employees.findIndex(emp => emp.id === id);

    employees.pop(employees[index]);
});

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});