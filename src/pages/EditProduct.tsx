import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import ProductForm from '../components/ProductForm';
import { Product } from '../types';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, updateProduct } = useProductContext();

  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="page-error">
        <h2>Sản phẩm không tồn tại</h2>
        <p>Sản phẩm mà bạn tìm kiếm không được tìm thấy.</p>
        <Link to="/" className="btn btn-primary">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const handleSubmit = (formData: Omit<Product, 'id'> | Product) => {
    if ('id' in formData) {
      updateProduct(formData as Product);
    } else {
      updateProduct({
        ...product,
        ...formData,
      });
    }
  };

  return (
    <div className="edit-product-page">
      <div className="page-header">
        <h1>Chỉnh sửa sản phẩm</h1>
      </div>

      <div className="page-content form-page">
        <ProductForm product={product} onSubmit={handleSubmit} isEditMode={true} />
      </div>
    </div>
  );
};

export default EditProduct;
