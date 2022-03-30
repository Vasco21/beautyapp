import React from 'react';
import { useRoutes } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';

import CartList from './pages/CartList';
import CartPayment from './pages/CartPayment';
import CartConfirmation from './pages/CartConfirmation';

import AboutUS from './pages/AboutUS';
import ContactUs from './pages/ContactUs';
import Footer from './pages/Footer';
import Navbar from './pages/Navbar';

import AppProvider from './provider/AppProvider';

import GlobalStyle from './styles/global';
import { AppContainer } from './styles/styles';

export default function App() {
  console.info(`==> 🌎  You are in the mode ${process.env.NODE_ENV}`);
  console.info(`==> 🌎  You are in the environment ${process.env.REACT_APP_ENVIRONMENT}`);

  const mainRoutes = {
    path: '/',
    element: <Home />
  };
  const cartRoutes = {
    path: 'cart/*',
    element: <Cart />,
    children: [
      { path: '*', element: <CartList /> },
      { path: 'payment', element: <CartPayment /> },
      { path: 'confirmation', element: <CartConfirmation /> }
    ]
  };

  const routing = useRoutes([mainRoutes, cartRoutes]);


  return (
    <AppContainer>
      {/* <Navbar/> */}
      <AppProvider>
          {routing}
          {/* <AboutUS />
          <ContactUs/>  */}
          {/* <Footer/> */}
        <GlobalStyle />
      </AppProvider>
    </AppContainer>
  )
}
