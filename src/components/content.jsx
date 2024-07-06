import React from "react";
import TodoListProvider from "../contexts/TodoListProvider";
import ToDoList from "./toDoList";

const Content = () => {
  return (
    <TodoListProvider>
      <ToDoList />
    </TodoListProvider>
  );
};

export default Content;
