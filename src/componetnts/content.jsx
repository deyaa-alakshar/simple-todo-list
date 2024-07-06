import React from "react";
import TodoListProvider from "../hooks/TodoListProvider";
import ToDoList from "./ToDoList";

const Content = () => {
  return (
    <TodoListProvider>
      <ToDoList />
    </TodoListProvider>
  );
};

export default Content;
