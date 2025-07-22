import express from "express";
import employeesRouter from "./api/employees.js"; // assuming alias set up for 'routes'

const app = express();
export default app;

// Parse JSON request bodies
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// Use employeesRouter for all /employees routes
app.use("/employees", employeesRouter);

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Sorry! Something went wrong :(");
});
