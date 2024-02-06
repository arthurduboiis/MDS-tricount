import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Home from './pages/Home.jsx'
import NewTricount from './pages/NewTricount.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ErrorBoundary } from './ErrorBoundary.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new-tricount",
    element: <NewTricount />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>,
)
