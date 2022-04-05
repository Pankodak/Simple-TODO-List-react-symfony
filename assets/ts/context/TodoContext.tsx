import React, { createContext, useState } from "react";

export interface ITodo {
    name: string;
}

export type TodoContextType = {
    todos: ITodo[];
    createTodo: () => void;
    updateTodo: () => void;
    deleteTodo: () => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoContextProvider: React.FC = ({ children }) => {
    const [todos, setTodos] = useState<ITodo[]>([{ name: "Test" }]);
    const createTodo = () => {};
    const updateTodo = () => {};
    const deleteTodo = () => {};
    return (
        <TodoContext.Provider
            value={{
                todos: [...todos],
                createTodo: createTodo,
                updateTodo: updateTodo,
                deleteTodo: deleteTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;
