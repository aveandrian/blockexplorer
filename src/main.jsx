import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader} from './routes/root'
import Transaction, {loader as transactionLoader} from './routes/transaction'
import Block, {loader as blockLoader} from './routes/block'
import ErrorPage from './error-page'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      children: [
        {
          
        }
      ]
    },
    {
        path: "tx/:txHash",
        element: <Transaction />,
        loader: transactionLoader
    },
    {
        path: "block/:blockNumber",
        element: <Block />,
        loader: blockLoader
    }
  ])
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );