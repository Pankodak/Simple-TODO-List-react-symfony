import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

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
    deleteTodo: (todoIndex: number) => void;
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
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get<ITodo[]>("/api/todo/read")
            .then((response) => {
                setTodos(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);
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
    const deleteTodo = (todoIndex: number) =>
        setTodos((prevTodos) =>
            prevTodos.filter((_, index) => index !== todoIndex)
        );

    return (
        <TodoContext.Provider
            value={{
                todos: [...todos],
                createTodo: createTodo,
                updateTodo: updateTodo,
                deleteTodo: deleteTodo,
            }}
        >
            {loading ? <div>Loading</div> : children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;
