const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let todos = [];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
    dueDate: req.body.dueDate,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).send("Todo not found");
  }
});

app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Todo backend running at http://localhost:${port}`);
});
