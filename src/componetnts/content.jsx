import React from "react";
import TodoListProvider from "../contexts/TodoListProvider";
import ToDoList from "./ToDoList";

const Content = () => {
  return (
    <TodoListProvider>
      <ToDoList />
    </TodoListProvider>
  );
};

export default Content;
