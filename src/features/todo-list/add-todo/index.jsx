import React, { useState } from "react";
import { useAddTodoMutation } from "../../../services/todo";

import styles from "./index.module.css";

export const AddTodo = () => {
  const [addTodo, { isLoading }] = useAddTodoMutation();
  const [value, setValue] = useState("");

  const onInputChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleAddTodo = () => {
    addTodo({
      title: value,
      completed: false,
    });
    setValue("");
  };

  return (
    <div>
      <input placeholder="Enter todo title..." type="text" value={value} onChange={onInputChange} />
      <button
        className={styles.addButton}
        onClick={handleAddTodo}
        disabled={isLoading}
      >
        Add todo
      </button>
    </div>
  );
};
