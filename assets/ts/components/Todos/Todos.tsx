import React, { useContext } from "react";
import { TodoContext, ITodo, TodoContextType } from "../../context/TodoContext";

import Todo from "./Todo/Todo";
const Todos = () => {
    const context = useContext(TodoContext) as TodoContextType;
    return (
        <div className="todo">
            <div className="todo__form">
                <input type="text" name="" id="" />
                <button type="submit"></button>
            </div>
            <div className="todo__table">
                <div className="todo__table__header">
                    <div className="todo__table-row">
                        <p className="todo__table__header-data">Name</p>
                        <p className="todo__table__header-data">Description</p>
                        <p className="todo__table__header-data">Actions</p>
                    </div>
                </div>
                <div className="todo__table__body">
                    {context.todos.map((todo: ITodo, index: number) => (
                        <div className="todo__table-row">
                            <Todo
                                styleName="todo__table__body-data"
                                key={index}
                                todo={todo}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Todos;
