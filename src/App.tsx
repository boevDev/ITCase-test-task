import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cart, Home, ProductList } from './pages';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='product-list' element={<ProductList />} />
        <Route path='cart' element={<Cart />} />
        <Route path='product/:id' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};
