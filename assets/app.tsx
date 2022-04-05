import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./scss/main.scss";

const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container);
root.render(
    <StrictMode>
        <p>Render</p>
    </StrictMode>
);
