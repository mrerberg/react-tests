import React from "react";
import cx from "classnames";
import { useUpdateTodoMutation } from "../../../services/todo";

import styles from "./index.module.css";

export const Todo = ({ todo }) => {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const { id, title, completed } = todo;

  const icon = completed ? "👌" : "👋";
  
  const toggleTodoItem = () => {
    updateTodo({ id, completed: !completed });
  };

  return (
    <li
      className={cx({
        [styles.loading]: isLoading,
      })}
    >
      <button
        className={styles.button}
        onClick={toggleTodoItem}
      >
        {icon}

        <span
          className={cx(styles.text, {
            [styles.completed]: completed,
          })}
        >
          {title}
        </span>
      </button>
    </li>
  );
};
