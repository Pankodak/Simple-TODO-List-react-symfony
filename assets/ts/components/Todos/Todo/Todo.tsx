import React from "react";

import { ITodo } from "../../../context/TodoContext";

type Todo = {
    todo: ITodo;
    styleName: string;
};

const Todo: React.FC<Todo> = ({ todo, styleName }) => {
    return (
        <>
            <div className={styleName}>
                <p>{todo.name}</p>
            </div>
            <div className={styleName}>
                <p className={styleName}>{todo.description}</p>
            </div>
            <div className={styleName}>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </>
    );
};

export default Todo;
