import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Search from './Pages/Search';
import LoginRegister from './Pages/LoginRegister';
import Profile from './Pages/Profile';

import {createBrowserRouter,RouterProvider, Navigate} from "react-router-dom";

const routerVaraible = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path:"/home",
        element:<Home />,
      },
      {
        path:"/cart",
        element:<Cart></Cart>,
      },
      {
        path:"/cart/:id",
        element:<Cart></Cart>,
      },
      {
        path:"/search",
        element:<Search></Search>,
      },
      {
        path:"/login",
        element:<LoginRegister></LoginRegister>,
      },
      {
        path:"/profile",
        element:<Profile></Profile>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={routerVaraible}></RouterProvider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
