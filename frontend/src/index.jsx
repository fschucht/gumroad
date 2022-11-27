import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ProductRoute } from './routes/product.route';
import { RegisterRoute } from './routes/register.route';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductRoute />
  },
  {
    path: "/register",
    element: <RegisterRoute />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
