import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import './custom.scss'; // Custom Bootstrap
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import HomeContent from './contents/HomeContent.jsx';
import ProductContent from './contents/ProductContent.jsx';
import CartContent from './contents/CartContent.jsx';
import LoginContent from './contents/LoginContent.jsx';
import RegisterContent from './contents/RegisterContent.jsx';
import ShippingContent from './contents/ShippingContent.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentContent from './contents/PaymentContent.jsx';
import PlaceOrderContent from './contents/PlaceOrderContent.jsx';
import OrderScreen from './contents/OrderScreen.jsx';

import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import ProfileContent from './contents/ProfileContent.jsx';

// Router: Add path here:
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      <Route index={true} path='/' element={<HomeContent />}/>
      <Route path='/product/:id' element={<ProductContent />}/>
      <Route path='/cart' element={<CartContent />}/>
      <Route path='/login' element={<LoginContent />}/>
      <Route path='/register' element={<RegisterContent />}/>
      

      <Route path=''  element={<PrivateRoute></PrivateRoute>}>
        <Route path='/shipping' element={<ShippingContent />}/>
        <Route path='/payment' element={<PaymentContent />}/>
        <Route path='/placeorder' element={<PlaceOrderContent />}/>
        <Route path='/orders/:id' element={<OrderScreen />}/>
        <Route path='/profile' element={<ProfileContent />}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
)
