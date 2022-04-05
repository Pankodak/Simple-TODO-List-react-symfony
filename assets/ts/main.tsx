import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom";

import TodoContextProvider from "./context/TodoContext";

import Todos from "./components/Todos/Todos";
const Main = () => {
    return (
        <>
            <TodoContextProvider>
                <Todos />
            </TodoContextProvider>
        </>
    );
};
export default Main;
