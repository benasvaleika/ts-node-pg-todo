import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ListTodo.module.css";
import { API_LINK } from "../constants/constants";
import { EditTodo } from "./EditTodo";

interface ListTodoProps {}

export const ListTodo: React.FC<ListTodoProps> = ({}) => {
  const [todos, setTodos] = useState<any>(null);

  const handleTodoDelete = async (deleteId: number) => {
    try {
      await axios.delete(`${API_LINK}todos/${deleteId}`);
      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    try {
      await axios.get(`${API_LINK}todos`).then((resp) => setTodos(resp.data));
      console.log("fetch");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <table className={styles.indivItem}>
        {todos
          ? todos.map((todo: any) => (
              <tr key={todo.todo_id}>
                <th>{todo.description}</th>
                <EditTodo todo={todo} />
                <button onClick={() => handleTodoDelete(todo.todo_id)}>
                  Delete
                </button>
              </tr>
            ))
          : null}
      </table>
    </div>
  );
};

export default ListTodo;
