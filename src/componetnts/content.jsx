import React from "react";
import TodoListProvider from "../contexts/todoListProvider";
import ToDoList from "./toDoList";

const Content = () => {
  return (
    <TodoListProvider>
      <ToDoList />
    </TodoListProvider>
  );
};

export default Content;
