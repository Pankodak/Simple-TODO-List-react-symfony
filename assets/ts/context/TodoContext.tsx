import React, { createContext, useState } from "react";

export interface ITodo {
    name: string;
    description: string;
}

export type TodoContextType = {
    todos: ITodo[];
    createTodo: () => void;
    updateTodo: () => void;
    deleteTodo: () => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const dummyContext: ITodo[] = [
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
    { name: "lorem", description: "ipsum" },
];

const TodoContextProvider: React.FC = ({ children }) => {
    const [todos, setTodos] = useState<ITodo[]>(dummyContext);
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
