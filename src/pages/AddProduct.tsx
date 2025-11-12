import React from 'react';
import { useProductContext } from '../ProductContext';
import ProductForm from '../components/ProductForm';
import { Product } from '../types';

const AddProduct: React.FC = () => {
  const { addProduct } = useProductContext();

  const handleSubmit = (product: Omit<Product, 'id'> | Product) => {
    if ('id' in product) {
      // This shouldn't happen in add mode
      addProduct(product as Omit<Product, 'id'>);
    } else {
      addProduct(product);
    }
  };

  return (
    <div className="add-product-page">
      <div className="page-header">
        <h1>Thêm sản phẩm mới</h1>
      </div>

      <div className="page-content form-page">
        <ProductForm onSubmit={handleSubmit} isEditMode={false} />
      </div>
    </div>
  );
};

export default AddProduct;
