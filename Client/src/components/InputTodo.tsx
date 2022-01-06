import React, { useState } from "react";
import axios from "axios";
import styles from "./InputTodo.module.css";
import { API_LINK } from "../constants/constants";

interface InputTodoProps {}

export const InputTodo: React.FC<InputTodoProps> = ({}) => {
  const [currInput, setCurrInput] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_LINK}todos`,
        { description: currInput },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          placeholder="Enter Todo"
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
        <button className={styles.inputBtn}>Add</button>
      </form>
    </div>
  );
};

export default InputTodo;
