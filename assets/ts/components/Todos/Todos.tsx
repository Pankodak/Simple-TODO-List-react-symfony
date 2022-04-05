import React, { useContext, useState } from "react";
import { TodoContext, ITodo, TodoContextType } from "../../context/TodoContext";

import Todo from "./Todo/Todo";
const Todos: React.FC = () => {
    const context = useContext(TodoContext) as TodoContextType;
    const [todoName, setTodoName] = useState("");
    const [todoDescription, setTodoDescription] = useState("");

    const handleSetTodoName = (value: string) => setTodoName(value);
    const handleSetTodoDescription = (value: string) =>
        setTodoDescription(value);
    const handleTodoSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        context.createTodo(todoName, todoDescription);
        setTodoName("");
        setTodoDescription("");
    };
    return (
        <div className="todo">
            <form className="todo__form" onSubmit={handleTodoSubmit}>
                <input
                    onChange={(e) => handleSetTodoName(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    placeholder="todo name"
                    value={todoName}
                    disabled={context.requestOnGoing}
                />
                <input
                    disabled={context.requestOnGoing}
                    onChange={(e) => handleSetTodoDescription(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    placeholder="todo description"
                    value={todoDescription}
                />
                <button disabled={context.requestOnGoing} type="submit">
                    Submit
                </button>
            </form>
            <div className="todo__table">
                <div className="todo__table__header">
                    <div className="todo__table-row">
                        <p className="todo__table__header-data">Name</p>
                        <p className="todo__table__header-data">Description</p>
                        <p className="todo__table__header-data">Actions</p>
                    </div>
                </div>
                <div className="todo__table__body">
                    {context.todos.map((todo: ITodo) => (
                        <div key={todo.id} className="todo__table-row">
                            <Todo
                                todo={todo}
                                styleName="todo__table__body-data"
                                updateTodo={context.updateTodo}
                                deleteTodo={context.deleteTodo}
                                requestOnGoing={context.requestOnGoing}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Todos;
