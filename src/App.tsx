import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './ProductContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <ProductProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </ProductProvider>
    </Router>
  );
}

export default App;
