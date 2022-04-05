import React, { useContext } from "react";
import { TodoContext, ITodo, TodoContextType } from "../../context/TodoContext";

const Todos = () => {
    const context = useContext(TodoContext) as TodoContextType;
    return (
        <div>
            {context.todos.map((todo: ITodo, index: number) => (
                <p key={index}>{todo.name}</p>
            ))}
        </div>
    );
};

export default Todos;
