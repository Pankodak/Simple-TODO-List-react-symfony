import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export interface ITodo {
    id: number;
    name: string;
    description: string;
}

export type TodoContextType = {
    todos: ITodo[];
    requestOnGoing: boolean;
    createTodo: (todoName: string, todoDescription: string) => void;
    updateTodo: (
        todoName: string,
        todoDescription: string,
        todoId: number
    ) => void;
    deleteTodo: (todoId: number) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const dummyContext: ITodo[] = [
    { id: 1, name: "lorem", description: "ipsum" },
];

const TodoContextProvider: React.FC = ({ children }) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState(true);
    const [requestOnGoing, setRequestOnGoing] = useState(false);

    useEffect(() => {
        setRequestOnGoing(true);
        axios
            .get<ITodo[]>("/api/todo/read")
            .then((response) => {
                setTodos(response.data);
                setLoading(false);
                setRequestOnGoing(false);
            })
            .catch((err) => {
                setLoading(false);
                setRequestOnGoing(false);
            });
    }, []);
    const createTodo = (todoName: string, todoDescription: string) => {
        const todo = {
            name: todoName,
            description: todoDescription,
        };
        setRequestOnGoing(true);
        axios
            .post<ITodo>("/api/todo/create", todo)
            .then((response) => {
                const newTodo = {
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                };
                setTodos((prevTodos) => [newTodo, ...prevTodos]);
                setRequestOnGoing(false);
            })
            .catch((err) => setRequestOnGoing(false));
    };
    const updateTodo = (
        todoName: string,
        todoDescription: string,
        todoId: number
    ) => {
        const todo = {
            name: todoName,
            description: todoDescription,
        };
        setRequestOnGoing(true);
        axios
            .put(`/api/todo/update/${todoId}`, todo)
            .then((res) => {
                setTodos((prevTodos: ITodo[]) => {
                    let newTodos = [...prevTodos];
                    newTodos = newTodos.map((todo) => {
                        if (todo.id !== todoId) return todo;
                        todo.name = todoName;
                        todo.description = todoDescription;
                        return todo;
                    });
                    return newTodos;
                });
                setRequestOnGoing(false);
            })
            .catch((error) => setRequestOnGoing(false));
    };
    const deleteTodo = (todoId: number) => {
        setRequestOnGoing(true);
        axios
            .delete(`/api/todo/delete/${todoId}`)
            .then((res) => {
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo.id !== todoId)
                );
                setRequestOnGoing(false);
            })
            .catch((err) => setRequestOnGoing(false));
    };

    return (
        <TodoContext.Provider
            value={{
                todos: [...todos],
                requestOnGoing: requestOnGoing,
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
