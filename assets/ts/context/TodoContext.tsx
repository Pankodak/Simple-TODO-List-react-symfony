import React, { createContext, useState } from "react";

export interface ITodo {
    name: string;
    description: string;
}

export type TodoContextType = {
    todos: ITodo[];
    createTodo: (todoName: string, todoDescription: string) => void;
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
    const createTodo = (name: string, description: string) => {
        let todo = {
            name: name,
            description: description,
        };
        setTodos((prevTodos) => [todo, ...prevTodos]);
    };
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
