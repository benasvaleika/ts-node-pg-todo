import express from "express";
import axios from "axios";
import cors from "cors";
import pool from "./db";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ROUTES //

// create a todo
app.post("/todos", async (req, res) => {
  try {
    let { description } = req.body;
    let newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    let allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get one todo
app.get("/todos/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { description } = req.body;
    let updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.send("item updated!");
  } catch (error) {
    console.error(error.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.send("item deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("TSIR");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
