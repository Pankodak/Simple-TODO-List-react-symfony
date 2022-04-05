import React, { createContext, useState } from "react";

export interface ITodo {
    name: string;
    description: string;
}

export type TodoContextType = {
    todos: ITodo[];
    createTodo: (todoName: string, todoDescription: string) => void;
    updateTodo: (
        todoName: string,
        todoDescription: string,
        todoIndex: number
    ) => void;
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
    const createTodo = (todoName: string, todoDescription: string) => {
        let todo = {
            name: todoName,
            description: todoDescription,
        };
        setTodos((prevTodos) => [todo, ...prevTodos]);
    };
    const updateTodo = (
        todoName: string,
        todoDescription: string,
        todoIndex: number
    ) => {
        console.log(todoName, todoDescription);
        setTodos((prevTodos: ITodo[]) => {
            let newTodos = [...prevTodos];
            newTodos = newTodos.map((todo, index) => {
                if (index !== todoIndex) return todo;
                todo.name = todoName;
                todo.description = todoDescription;
                return todo;
            });
            return newTodos;
        });
    };
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
