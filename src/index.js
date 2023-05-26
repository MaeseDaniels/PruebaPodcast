import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import Detail from "./pages/Detail";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/podcast/:podcastId",
    element: <Detail />,
  },
  { path: "/podcast/:podcastId/episode/:episode", element: <Detail /> },
]);
root.render(
  <React.StrictMode>
    <header className="header">
      <h1>Podcaster</h1>
    </header>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
