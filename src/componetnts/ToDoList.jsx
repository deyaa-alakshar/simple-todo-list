import Loading from "./Loading";
import Todo from "./Todo";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MarkAsCompleteDialog from "./MarkAsCompleteDialog";
import DeleteDialog from "./DeleteDialog";
import Toast from "./Toast";
import EditeDialog from "./EditeDialog";
import { CiFilter, CiSearch } from "react-icons/ci";
import InputAdornment from "@mui/material/InputAdornment";

import useTodoListContext from "../hooks/useTodoListContext";

const ToDoList = () => {
  const {
    settings,
    toDolist,
    todoTitle,
    handleTitle,
    handleSearch,
    handleAdd,
    handleFilterd,
  } = useTodoListContext();

  if (settings.isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-zinc-900 p-5 min-h-screen">
      <div className="w-3/4 m-auto ">
        <h1 className="text-4xl font-semibold text-white font-serif text-center">
          My todos
        </h1>
        <div className="bg-zinc-700 p-5 rounded-md mt-4">
          <div className="border-b border-zinc-600 pb-4 flex justify-start items-end space-x-5">
            <div className="w-1/2">
              <label className="font-semibold text-white text-xs mb-1 block">
                Title
              </label>
              <TextField
                className="bg-white rounded-md"
                size="small"
                fullWidth={true}
                variant="outlined"
                placeholder="Please write your todo title"
                value={todoTitle}
                onChange={(e) => handleTitle(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <Button variant="contained" color="success" onClick={handleAdd}>
                Add
              </Button>
            </div>
          </div>
          <div className="mt-5">
            <div className="md:flex sm:block justify-between mt-2">
              <div className="md:space-x-2 flex sm:flex-col md:flex-row gap-2 mb-2">
                <Button sx={{ color: "white" }}>
                  <CiFilter size={40} /> Filter
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="contained"
                  color="inherit"
                  onClick={() => handleFilterd("all")}
                >
                  All
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="contained"
                  color="inherit"
                  onClick={() => handleFilterd("todo")}
                >
                  Todo
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="contained"
                  color="success"
                  onClick={() => handleFilterd("completed")}
                >
                  Completed
                </Button>
              </div>
              <div>
                <TextField
                  placeholder="Search"
                  className="bg-white rounded-md sm:w-100"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CiSearch />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            {toDolist.filterd?.length > 0 ? (
              toDolist.filterd?.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))
            ) : (
              <div className="bg-zinc-900 p-4 flex sm:flex-col md:flex-row gap-2  justify-between my-2 rounded-md">
                <h2 className="text-orange-400 text-xl font-bold">
                  There are no tasks here
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <MarkAsCompleteDialog />
      <DeleteDialog />
      <EditeDialog />
      <Toast />
    </div>
  );
};
export default ToDoList;
