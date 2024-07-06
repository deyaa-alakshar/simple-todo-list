import React, { createContext, useMemo } from "react";
import useTodoList from "./useTodoList";

const TodoListProvider = ({ children }) => {
  const todoListValues = useTodoList();

  return (
    <TodoListContext.Provider
      value={useMemo(() => ({ ...todoListValues }), [todoListValues])}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export const TodoListContext = createContext(null);

export default TodoListProvider;
