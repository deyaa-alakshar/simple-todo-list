import { useContext } from "react";
import { TodoListContext } from "../contexts/TodoListProvider";

const useTodoListContext = () => {
  const context = useContext(TodoListContext);

  if (!context) {
    throw new Error(
      "useTodoListContext must be used within a todoListProvider"
    );
  }
  return context;
};

export default useTodoListContext;
