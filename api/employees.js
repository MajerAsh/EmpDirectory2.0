import express from "express";
const router = express.Router();
export default router;

import employees from "../db/employees.js";

// GET /employees and POST /employees
router
  .route("/")
  .get((req, res) => {
    res.send(employees);
  })
  .post((req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body.");

    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).send("New employee must have a valid name.");
    }

    const newEmployee = {
      id: Math.max(0, ...employees.map((e) => e.id)) + 1,
      name: name.trim(),
    };

    employees.push(newEmployee);
    res.status(201).send(newEmployee);
  });

// GET /employees/random
router.route("/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

// GET /employees/:id
router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) return res.status(404).send("Employee not found.");

  res.send(employee);
});
