import InputTodo from "./components/InputTodo";
import styles from "./App.module.css";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <div>
      <div className={styles.mainContainer}>
        <InputTodo />
        <div className={styles.todoList}>
          <ListTodo />
        </div>
      </div>
    </div>
  );
}

export default App;
