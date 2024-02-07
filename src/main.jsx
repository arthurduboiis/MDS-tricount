import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import NewTricount from './pages/NewTricount.jsx'
import Tricount from './pages/Tricount.jsx'
import NewExpense from './pages/NewExpense.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
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
  },
  {
    path: "/tricount/:id",
    element: <Tricount />,
  },
  {
    path: "/:id/new-expense",
    element: <NewExpense />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>,
)
