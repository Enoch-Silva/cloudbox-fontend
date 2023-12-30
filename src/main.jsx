import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./home.jsx";
import ContactList from "./ContactList.jsx";
import ContactDetail from "./ContactDetail.jsx";
import ContactAdd from "./ContactAdd.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/list",
        element: <ContactList />,
      },
      {
        path: "contact/:id",
        element: <ContactDetail />,
      },
      {
        path: "/add",
        element: <ContactAdd />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
