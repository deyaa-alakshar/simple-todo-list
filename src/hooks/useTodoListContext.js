import { useContext } from "react";
import { TodoListContext } from "../contexts/todoListProvider";

const UseTodoListContext = () => {
  const context = useContext(TodoListContext);

  if (!context) {
    throw new Error(
      "useTodoListContext must be used within a todoListProvider"
    );
  }
  return context;
};

export default UseTodoListContext;
