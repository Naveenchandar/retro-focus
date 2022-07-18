import { useState, useEffect, SyntheticEvent, KeyboardEvent } from "react";
import { ImCross } from "react-icons/im";
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';

type TodoType = {
  id: string,
  text: string,
  completed?: boolean
}

export const Todos = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editId, setEditID] = useState("0");
  const [openTodo, setOpenTodo] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [noTodoText, setNoTodoText] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (editId) {
      const editTodo = todos.find(({ id }) => id === editId);
      const updateTodo = todos.map((item) =>
        item.id === editTodo?.id
          ? (item = { id: item.id, text })
          : { id: item.id, text: item.text, completed: false }
      );
      setTodos(updateTodo);
      setEditID("0");
      setText("");
      return;
    }
  };

  const handleTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const id = uuidv4();
      const result = [...todos, { id, text, completed: false }];
      setTodos(result);
      localStorage.setItem("retro-todo", JSON.stringify(todos));
      setText("");
    }
  };

  const checkLocalStorageItem = (data: string | null) => {
    if (typeof data === 'string') {
      setTodos(JSON.parse(data));
    }
  }

  useEffect(() => {
    const localTodos = localStorage.getItem("retro-todo");
    checkLocalStorageItem(localTodos);
  }, []);

  const editHandler = (editId: string) => {
    const editTodo = todos.find(({ id }) => id === editId);
    setText(editTodo?.text || '');
    setEditID(editId);
  };

  const deleteHandler = (deleteId: string) => {
    setTodos(todos.filter(({ id }) => id !== deleteId));
    localStorage.removeItem("retro-todo");
  };

  const handleTodos = (todoId: string) => {
    const todoToBeCompleted = todos.find(({ id }) => id === todoId) as TodoType;
    todoToBeCompleted.completed = !todoToBeCompleted?.completed;
    const completedTodos = [
      ...todos.filter((todo) => todo.id !== todoId),
      todoToBeCompleted,
    ] as TodoType[];
    setTodos(completedTodos);
  };

  const filterTodoBySearchText = (targetValue: string) => {
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
      const localTodos = localStorage.getItem("retro-todo");
      checkLocalStorageItem(localTodos);
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
                <Todo
                  key={id}
                  text={text}
                  completed={completed}
                  editHandler={editHandler}
                  id={id}
                  deleteHandler={deleteHandler}
                  handleTodos={handleTodos}
                />
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
