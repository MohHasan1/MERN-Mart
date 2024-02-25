import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import App from './App.jsx';
import './custom.scss'; // Custom Bootstrap
import HomeContent from './contents/HomeContent.jsx';
import ProductContent from './contents/ProductContent.jsx';

// Router: Add path here:
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      // Add content paths:
      <Route index={true} path='/' element={<HomeContent />}/>
      <Route path='/product/:id' element={<ProductContent />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
