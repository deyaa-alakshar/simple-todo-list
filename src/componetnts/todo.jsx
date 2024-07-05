import React from "react";
import { FaCheck, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const Todo = (props) => {
  return (
    <div className="bg-zinc-900 p-4 flex sm:flex-col md:flex-row gap-2  justify-between my-2 rounded-md">
      <div className="w-3/4">
        <h2 className="text-gray-200 text-xl font-bold">{props.todo.todo}</h2>
      </div>
      <div className="flex space-x-3">
        <Tooltip title="Edit">
          <button onClick={() => props.handleOpeneEdit(props.todo)}>
            <FaEdit className="cursor-pointer" size={20} color="#FFC53D" />
          </button>
        </Tooltip>
        <Tooltip
          title={props.todo.completed ? "Completed" : "Mark as completed"}
        >
          <button
            onClick={() =>
              !props.todo.completed &&
              props.hanldeOpenMarkAsComplete(props.todo)
            }
          >
            <FaCheck
              className="cursor-pointer"
              size={20}
              color={`${props.todo.completed ? "#46A758" : "#1B2A1E"} `}
            />
          </button>
        </Tooltip>
        <Tooltip title="Delete">
          <button onClick={() => props.hanldeOpenDelete(props.todo)}>
            <FaRegTrashAlt
              className="cursor-pointer"
              size={20}
              color="#E54D2E"
            />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Todo;
