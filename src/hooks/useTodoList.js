import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const initialSettings = {
  openToast: false,
  openDelete: false,
  openMarkAsComplete: false,
  openEdite: false,
  isLoading: false,
  error: false,
  message: "",
  search: "",
  selected: {},
};

const useTodoList = () => {
  const [toDolist, setTodoList] = useState({ orginal: [], filterd: [] });
  const [settings, setSettings] = useState(initialSettings);
  const [todoTitle, setTodoTitle] = useState("");

  const handleAdd = useCallback(() => {
    setTodoList((prev) => {
      return {
        ...prev,
        orginal: [
          {
            id: toDolist.orginal.length + 1,
            todo: todoTitle,
            completed: false,
            userId: 1,
          },
        ].concat([...toDolist.orginal]),
        filterd: [
          {
            id: toDolist.filterd.length + 1,
            todo: todoTitle,
            completed: false,
            userId: 1,
          },
        ].concat([...toDolist.filterd]),
      };
    });

    setSettings((prev) => {
      return { ...prev, openToast: true, message: "Task added successfully" };
    });
    setTodoTitle("");
  }, [setSettings, setTodoList, toDolist, todoTitle]);

  const handleOpeneEdit = useCallback(
    (todo) => {
      setSettings((prev) => {
        return { ...prev, openEdite: true, selected: todo };
      });
    },
    [setSettings]
  );

  const handleEdit = useCallback(
    (title) => {
      const list = [...toDolist.filterd];
      const targetIndex = list.findIndex(
        (element) => element.id === settings.selected.id
      );
      list[targetIndex].todo = title;
      setTodoList((prev) => {
        return { ...prev, filterd: list };
      });

      setSettings((prev) => {
        return {
          ...prev,
          openToast: true,
          message: "Task has been modified successfully",
          openEdite: false,
        };
      });
    },
    [setSettings, setTodoList, toDolist, settings]
  );

  const handleOpenMarkAsComplete = useCallback(
    (todo) => {
      setSettings((prev) => {
        return { ...prev, openMarkAsComplete: true, selected: todo };
      });
    },
    [setSettings]
  );

  const handleMarkAsComplete = useCallback(() => {
    const list = [...toDolist.filterd];

    const targetIndex = list.findIndex(
      (element) => element.id === settings.selected.id
    );

    list[targetIndex].completed = true;

    setTodoList((prev) => {
      return { ...prev, filterd: list };
    });

    setSettings((prev) => {
      return {
        ...prev,
        openToast: true,
        message: "Task has been marked as complete",
        openMarkAsComplete: false,
      };
    });
  }, [setSettings, setTodoList, toDolist, settings]);

  const handleOpenDelete = useCallback(
    (todo) => {
      setSettings((prev) => ({ ...prev, selected: todo, openDelete: true }));
    },
    [setSettings]
  );

  const handleDelete = useCallback(() => {
    setTodoList((prev) => {
      return {
        ...prev,
        filterd: toDolist.filterd.filter(
          (todo) => todo.id !== settings.selected.id
        ),
      };
    });

    setSettings((prev) => {
      return {
        ...prev,
        openToast: true,
        message: "Task has been deleted successfully",
        openDelete: false,
      };
    });
  }, [setSettings, setTodoList, toDolist, settings]);

  const handleSearch = useCallback(
    (search) => {
      setTodoList((prev) => {
        return {
          ...prev,
          filterd: toDolist.orginal.filter((element) =>
            element.todo.includes(search || "")
          ),
        };
      });
      setSettings((prev) => {
        return { ...prev, search: search };
      });
    },
    [setTodoList, setSettings, toDolist]
  );

  const handleTitle = useCallback(
    (search) => {
      setTodoTitle(search);
    },
    [setTodoTitle]
  );

  const handleFilterd = useCallback(
    (filter) => {
      setSettings((prev) => {
        return { ...prev, search: "" };
      });

      if (filter === "all") {
        setTodoList((prev) => {
          return { ...prev, filterd: [...toDolist.orginal] };
        });
      } else if (filter === "todo") {
        setTodoList((prev) => {
          return {
            ...prev,
            filterd: [...toDolist.orginal].filter(
              (element) => !element.completed
            ),
          };
        });
      } else if (filter === "completed") {
        setTodoList((prev) => {
          return {
            ...prev,
            filterd: [...toDolist.orginal].filter(
              (element) => element.completed
            ),
          };
        });
      }
    },
    [setTodoList, setSettings, toDolist]
  );

  const handleClose = useCallback(() => {
    setSettings((prev) => {
      return {
        ...prev,
        openDelete: false,
        openMarkAsComplete: false,
        openToast: false,
        openEdite: false,
        error: false,
      };
    });
  }, [setSettings]);

  useEffect(() => {
    const getData = async () => {
      try {
        setSettings((prev) => {
          return { ...prev, isLoading: true };
        });

        const promise = await axios.get("https://dummyjson.com/todos");
        if (promise.status === 200) {
          setTodoList((prev) => {
            return {
              ...prev,
              orginal: promise.data.todos,
              filterd: promise.data.todos,
            };
          });
          setSettings((prev) => {
            return { ...prev, isLoading: false };
          });
        }
      } catch (err) {
        setSettings((prev) => {
          return {
            ...prev,
            isLoading: false,
            error: true,
            message:
              "An error occurred while getting the data please try again",
            openToast: true,
          };
        });
      }
    };
    if (toDolist.orginal.length === 0) {
      getData();
    }
  }, [toDolist.orginal.length, setSettings, setTodoList]);

  return {
    settings,
    toDolist,
    todoTitle,
    handleTitle,
    handleSearch,
    handleClose,
    handleAdd,
    handleEdit,
    handleOpeneEdit,
    handleMarkAsComplete,
    handleOpenMarkAsComplete,
    handleDelete,
    handleOpenDelete,
    handleFilterd,
  };
};

export default useTodoList;
