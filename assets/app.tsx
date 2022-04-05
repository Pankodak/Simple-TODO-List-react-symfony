import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Main from "./ts/main";
import "./scss/main.scss";

const container = document.getElementById("root")! as HTMLDivElement;
const root = ReactDOM.createRoot(container);
root.render(
    <StrictMode>
        <Main />
    </StrictMode>
);
