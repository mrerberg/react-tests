import { TodosList } from "./todos-list";
import { AddTodo } from "./add-todo";

export const TodoList = () => {
  return (
    <>
      <AddTodo />
      <TodosList />
    </>
  );
}