import React, { useState } from "react";

import { ITodo, TodoContextType } from "../../../context/TodoContext";

type Todo = {
    todo: ITodo;
    styleName: string;
    updateTodo: TodoContextType["updateTodo"];
    deleteTodo: TodoContextType["deleteTodo"];
    todoIndex: number;
};

const Todo: React.FC<Todo> = ({
    todo,
    styleName,
    updateTodo,
    deleteTodo,
    todoIndex,
}) => {
    const [editing, setEditing] = useState(false);
    const [todoName, setTodoName] = useState(todo.name);
    const [todoDescription, setTodoDescription] = useState(todo.name);
    const handleTodoNameChange = (value: string) => setTodoName(value);
    const handleTodoDescriptionChange = (value: string) =>
        setTodoDescription(value);
    const abortEditing = () => {
        setEditing(false);
        setTodoName(todo.name);
        setTodoDescription(todo.description);
    };
    const submitTodo = () => {
        updateTodo(todoName, todoDescription, todoIndex);
        setEditing(false);
    };
    return (
        <>
            <div className={styleName}>
                {!editing ? (
                    <p>{todo.name}</p>
                ) : (
                    <input
                        type="text"
                        value={todoName}
                        onChange={(e) => handleTodoNameChange(e.target.value)}
                    />
                )}
            </div>
            <div className={styleName}>
                {!editing ? (
                    <p>{todo.description}</p>
                ) : (
                    <input
                        type="text"
                        value={todoDescription}
                        onChange={(e) =>
                            handleTodoDescriptionChange(e.target.value)
                        }
                    />
                )}
            </div>
            <div className={styleName}>
                {!editing ? (
                    <button onClick={() => setEditing(true)}>Edit</button>
                ) : (
                    <>
                        <button onClick={() => submitTodo()}>Submit</button>
                        <button onClick={() => abortEditing()}>Cancel</button>
                    </>
                )}
                <button onClick={() => deleteTodo(todoIndex)}>Delete</button>
            </div>
        </>
    );
};

export default Todo;
