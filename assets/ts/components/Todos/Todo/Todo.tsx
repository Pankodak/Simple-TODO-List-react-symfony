import React, { useState } from "react";

import { ITodo, TodoContextType } from "../../../context/TodoContext";

type Todo = {
    todo: ITodo;
    requestOnGoing: boolean;
    styleName: string;
    updateTodo: TodoContextType["updateTodo"];
    deleteTodo: TodoContextType["deleteTodo"];
};

const Todo: React.FC<Todo> = ({
    todo,
    styleName,
    updateTodo,
    deleteTodo,
    requestOnGoing,
}) => {
    const [editing, setEditing] = useState(false);
    const [todoName, setTodoName] = useState(todo.name);
    const [todoDescription, setTodoDescription] = useState(todo.description);
    const handleTodoNameChange = (value: string) => setTodoName(value);
    const handleTodoDescriptionChange = (value: string) =>
        setTodoDescription(value);
    const abortEditing = () => {
        setTodoName(todo.name);
        setTodoDescription(todo.description);
        setEditing(false);
    };
    const submitTodo = () => {
        updateTodo(todoName, todoDescription, todo.id);
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
                        disabled={requestOnGoing}
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
                        disabled={requestOnGoing}
                    />
                )}
            </div>
            <div className={styleName}>
                {!editing ? (
                    <button
                        disabled={requestOnGoing}
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </button>
                ) : (
                    <>
                        <button
                            disabled={requestOnGoing}
                            onClick={() => submitTodo()}
                        >
                            Submit
                        </button>
                        <button
                            disabled={requestOnGoing}
                            onClick={() => abortEditing()}
                        >
                            Cancel
                        </button>
                    </>
                )}
                <button
                    disabled={requestOnGoing}
                    onClick={() => deleteTodo(todo.id)}
                >
                    Delete
                </button>
            </div>
        </>
    );
};

export default Todo;
