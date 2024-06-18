import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';

//Páginas
import CreateUserStore from './assets/js/userStore/createUserStore';
import Home from './assets/js/pag/home';
import Dashboard from './assets/js/userStore/dashboard';
import LoginUserStore from './assets/js/userStore/loginUserStore';
import PerimetriaeDobrasM from './assets/js/product/PerimetriaeDobrasM';
import { ComponenteProvider } from './assets/js/product/Context';  // Certifique-se de ajustar o caminho confo
import ResetPasswordRequest from './assets/js/userStore/resetPasswordrequest';
import ResetPassword from './assets/js/userStore/resetPassword';

//Rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "criar-conta",
    element: <CreateUserStore/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/login",
    element: <LoginUserStore/>
  },
  {
    path: "/masculino",
    element: <PerimetriaeDobrasM/>
  },
  {
    path: "/redefinir-senha",
    element: <ResetPasswordRequest/>
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ComponenteProvider>
      <RouterProvider router={router}/>
    </ComponenteProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
