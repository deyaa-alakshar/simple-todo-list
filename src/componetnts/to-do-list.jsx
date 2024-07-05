import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import Todo from "./todo";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MarkAsCompleteDialog from "./markAsCompleteDialog";
import DeleteDialog from "./deleteDialog";
import Toast from "./toast";
import EditeDialog from "./editeDialog";
import { CiSearch } from "react-icons/ci";
import InputAdornment from "@mui/material/InputAdornment";

const ToDoList = () => {
  const initialSettings = {
    openToast: false,
    openDelete: false,
    openMarkAsComplete: false,
    openEdite: false,
    isLoading: false,
    message: "",
    search: "",
    selected: {},
  };

  const [toDolist, setTodoList] = useState({ orginal: [], filterd: [] });
  const [todoTitle, setTodoTitle] = useState("");
  const [settings, setSettings] = React.useState(initialSettings);

  const getTodoes = async () => {
    try {
      const newSettings = { ...settings };
      newSettings.isLoading = true;
      setSettings(newSettings);

      const promise = await axios.get("https://dummyjson.com/todos");
      if (promise.status === 200) {
        setTodoList({
          orginal: promise.data.todos,
          filterd: promise.data.todos,
        });
        const newSettings = { ...settings };
        newSettings.isLoading = false;
        setSettings(newSettings);
      }
    } catch (err) {
      const newSettings = { ...settings };
      newSettings.isLoading = false;
      setSettings(newSettings);
    }
  };

  const handleAdd = () => {
    const list = { ...toDolist };
    const filterd = [...list.filterd];

    filterd.unshift({
      id: list.filterd.length + 1,
      todo: todoTitle,
      completed: false,
      userId: 1,
    });
    const orginal = [...list.orginal];

    orginal.unshift({
      id: list.orginal.length + 1,
      todo: todoTitle,
      completed: false,
      userId: 1,
    });

    setTodoList({ orginal: orginal, filterd: filterd });
    const newSettings = { ...settings };
    newSettings.openToast = true;
    newSettings.message = "Task added successfully";
    setSettings(newSettings);
    setTodoTitle("");
  };

  const handleClose = () => {
    setSettings(initialSettings);
  };

  const hanldeOpenDelete = (todo) => {
    const newSettings = { ...settings };
    newSettings.openDelete = true;
    newSettings.selected = todo;
    setSettings(newSettings);
  };

  const handleDelete = () => {
    const list = { ...toDolist };
    const newList = list.filterd.filter(
      (todo) => todo.id !== settings.selected.id
    );
    list.filterd = newList;
    const newSettings = { ...settings };
    newSettings.openToast = true;
    newSettings.message = "Task has been deleted successfully";
    newSettings.openDelete = false;
    setSettings(newSettings);
    setTodoList(list);
  };

  const handleOpeneEdit = (todo) => {
    const newSettings = { ...settings };
    newSettings.openEdite = true;
    newSettings.selected = todo;
    setSettings(newSettings);
  };

  const handleEdit = (title) => {
    const list = { ...toDolist };
    const newList = [...list.filterd];
    const targetIndex = newList.findIndex(
      (element) => element.id === settings.selected.id
    );

    newList[targetIndex].todo = title;
    list.filterd = newList;
    setTodoList(list);
    const newSettings = { ...settings };
    newSettings.openToast = true;
    newSettings.message = "Task has been modified successfully";
    newSettings.openEdite = false;
    setSettings(newSettings);
  };

  const hanldeOpenMarkAsComplete = (todo) => {
    const newSettings = { ...settings };
    newSettings.openMarkAsComplete = true;
    newSettings.selected = todo;
    setSettings(newSettings);
  };

  const handleMarkAsComplete = () => {
    const list = { ...toDolist };
    const newList = [...list.filterd];
    const targetIndex = newList.findIndex(
      (element) => element.id === settings.selected.id
    );

    newList[targetIndex].completed = true;
    list.filterd = newList;
    setTodoList(list);
    const newSettings = { ...settings };
    newSettings.openToast = true;
    newSettings.message = "Task has been marked as complete";
    newSettings.openMarkAsComplete = false;
    setSettings(newSettings);
  };

  const handleFilterd = (filter) => {
    const list = { ...toDolist };
    if (filter === "all") {
      const orginal = [...list.orginal];
      list.filterd = orginal;
      setTodoList(list);
    } else if (filter === "todo") {
      const todos = list.orginal.filter((element) => !element.completed);
      list.filterd = todos;
      setTodoList(list);
    } else if (filter === "completed") {
      const todos = list.orginal.filter((element) => element.completed);
      list.filterd = todos;
      setTodoList(list);
    }
  };

  useEffect(() => {
    getTodoes();
  }, []);

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
                onChange={(e) => setTodoTitle(e.target.value)}
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
                    const list = { ...toDolist };
                    const filterd = list.orginal.filter((element) =>
                      element.todo.includes(e.target.value || "")
                    );
                    list.filterd = filterd;
                    setTodoList(list);
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
            {toDolist.filterd.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                hanldeOpenDelete={hanldeOpenDelete}
                hanldeOpenMarkAsComplete={hanldeOpenMarkAsComplete}
                handleOpeneEdit={handleOpeneEdit}
              />
            ))}
          </div>
        </div>
      </div>
      <MarkAsCompleteDialog
        open={settings.openMarkAsComplete}
        handleClose={handleClose}
        handleMarkAsComplete={handleMarkAsComplete}
      />
      <DeleteDialog
        open={settings.openDelete}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <EditeDialog
        open={settings.openEdite}
        handleClose={handleClose}
        handleEdit={handleEdit}
        todo={settings.selected}
      />
      <Toast
        open={settings.openToast}
        message={settings.message}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ToDoList;
