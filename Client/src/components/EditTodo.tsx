import axios from "axios";
import React, { Fragment, useState } from "react";
import { API_LINK } from "../constants/constants";
import styles from "./EditTodo.module.css";

interface EditTodoProps {
  todo: any;
}

export const EditTodo: React.FC<EditTodoProps> = ({ todo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currValue, setCurrValue] = useState("");

  const openModal = () => {
    setModalOpen(!modalOpen);
    setCurrValue(todo.description);
  };

  const closeModal = () => {
    setModalOpen(!modalOpen);
  };

  const editHandler = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_LINK}todos/${todo.todo_id}`,
        { description: currValue },
        { headers: { "Content-Type": "application/json" } }
      );

      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      {modalOpen ? (
        <div className={styles.modalBackground}>
          <div className={styles.modalCenterContainer}>
            <form>
              <div className={styles.modalInput}>
                <label>Edit todo:</label>
                <input
                  value={currValue}
                  onChange={(e) => setCurrValue(e.target.value)}
                ></input>
              </div>
              <div className={styles.modalButtons}>
                <button onClick={(e) => editHandler(e)}>Edit</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button onClick={openModal}>Edit</button>
      )}
    </Fragment>
  );
};
