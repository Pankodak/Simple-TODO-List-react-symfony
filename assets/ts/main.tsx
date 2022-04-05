import React from "react";

import TodoContextProvider from "./context/TodoContext";

import Todos from "./components/Todos/Todos";
const Main: React.FC = () => {
    return (
        <TodoContextProvider>
            <Todos />
        </TodoContextProvider>
    );
};
export default Main;
