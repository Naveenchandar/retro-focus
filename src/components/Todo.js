import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { v4 as uuidv4 } from 'uuid';

export const Todo = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0);
  const [openTodo, setOpenTodo] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [noTodoText, setNoTodoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updateTodo = todos.map((item) =>
        item.id === editTodo.id
          ? (item = { id: item.id, text })
          : { id: item.id, text: item.text, completed: false }
      );
      setTodos(updateTodo);
      setEditID(0);
      setText("");
      return;
    }
  };

  const handleTodo = (e) => {
    if (e.key === "Enter") {
      const id = uuidv4();
      const result = [...todos, { id, text, completed: false }];
      setTodos(result);
      localStorage.setItem("retro-todo", JSON.stringify(todos));
      setText("");
    }
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("retro-todo")) || []);
  }, []);

  const editHandler = (id) => {
    const editTodo = todos.find((elem) => elem.id === id);
    setText(editTodo.text);
    setEditID(id);
  };

  const deleteHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    localStorage.removeItem("retro-todo");
  };

  const handleTodos = (id) => {
    const todoToBeCompleted = todos.find((elem) => elem.id === id);
    todoToBeCompleted.completed = !todoToBeCompleted.completed;
    const completedTodos = [
      ...todos.filter((todo) => todo.id !== id),
      todoToBeCompleted,
    ];
    setTodos(completedTodos);
  };

  const filterTodoBySearchText = (targetValue) => {
    setSearchText(targetValue);
    if (targetValue) {
      const filterValues = todos.filter(({ text }) => text?.includes(targetValue))
      if (filterValues?.length) {
        setTodos(filterValues);
        setNoTodoText('');
      } else {
        setNoTodoText('No todo found');
        setTodos([]);
      }
    } else {
      setNoTodoText('');
      setTodos(JSON.parse(localStorage.getItem("retro-todo")) || []);
    }
  }

  return (
    <>
      <div
        className="sm:text-xl bg-neutral-400 text-black font-bold p-1 px-2 rounded-md absolute bottom-8 right-14 cursor-pointer"
        onClick={() => setOpenTodo(!openTodo)}
      >
        TODO
      </div>
      {openTodo && (
        <div className="bg-neutral-800 w-80 h-auto absolute bottom-32 right-10 m-2 mx-4 p-4 rounded-lg">
          <>
            <div className="flex items-center justify-between m-2">
              <p className="sm:text-xl text-left font-medium">Today's Todo</p>
              <span
                className="cursor-pointer text-emerald-500"
                onClick={() => setOpenTodo(!openTodo)}
              >
                <ImCross size={14} title="Close Todo" />
              </span>
            </div>
            <input
              type="text"
              className="rounded-md cursor-pointer flex ml-2 text-black pl-2"
              placeholder="Search Todo"
              value={searchText}
              onChange={(e) => filterTodoBySearchText(e.target.value)}
            />
          </>

          <div className="text-left m-1 sm:text-xl font-medium">
            {noTodoText && <span className="text-sm">{noTodoText}</span>}
            <ul>
              {todos.map(({ id, text, completed }) => (
                <li
                  className="flex items-center justify-start gap-1"
                  key={id}
                  style={{ textDecoration: completed ? "line-through" : "none" }}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    name={text}
                    value={text}
                    onClick={() => handleTodos(id)}
                    title="Strike Todo"
                  />
                  <span className="sm:text-xl m-0.5">{text}</span>
                  <span
                    className="px-1.5 text-lime-400 cursor-pointer"
                    onClick={() => editHandler(id)}
                  >
                    <FaEdit size={18} title="Edit Todo" />
                  </span>
                  <span
                    className="text-red-600 cursor-pointer"
                    onClick={() => deleteHandler(id)}
                  >
                    <AiFillDelete size={20} title="Delete Todo" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-left m-1">
            <form onSubmit={handleSubmit} id="handle-todo">
              <input
                type="text"
                className="border-0 outline-none rounded-md text-white cursor-pointer bg-transparent"
                placeholder="New Todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleTodo}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};
