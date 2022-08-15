import { Todo } from "../todo";

import {useGetAllTodosQuery} from '../../../services/todo';

import styles from './index.module.css';

export const TodosList = () => {
  const { data, error, isLoading } = useGetAllTodosQuery();

  const isEmptyList = !isLoading && !data?.length;

   if (isLoading) {
     return <p>Loading...</p>;
   }

   if (error) {
     return <p>Oops, some error just happened</p>;
   }

   if (isEmptyList) {
     return <p>No todos, yay!</p>;
   }

  return (
    <ul className={styles.list}>
      {data.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

