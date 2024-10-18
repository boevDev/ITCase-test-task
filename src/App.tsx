import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cart, Home, Product, Products } from './pages';
import { Header } from './components';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path='cart' element={<Cart />} />
        <Route path='product/:id' element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};
