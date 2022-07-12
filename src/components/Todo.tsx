import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

type TodoProps = {
    id: string,
    text: string,
    completed?: boolean
    handleTodos: (id: string) => void,
    editHandler: (id: string) => void,
    deleteHandler: (id: string) => void,
}

export const Todo = ({ id, completed, text, handleTodos, editHandler, deleteHandler }: TodoProps): JSX.Element => {
    return (
        <li
            className="flex items-center justify-start gap-1"
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
    )
}