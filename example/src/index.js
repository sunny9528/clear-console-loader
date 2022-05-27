import React, { StrictMode } from "react";
import ReactDom from "react-dom";
import App from "./App";
console.log('this is index');
console.time()
ReactDom.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById("root")
);
console.timeEnd()
