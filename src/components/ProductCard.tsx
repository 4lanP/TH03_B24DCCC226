import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${product.ten}" không?`)) {
      onDelete(product.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const categoryColors: Record<string, string> = {
    'Điện tử': '#2D9CDB', // blue
    'Quần áo': '#9B59B6', // purple
    'Đồ ăn': '#F39C12',   // orange
    'Sách': '#27AE60',    // green
  };

  const headerColor = categoryColors[product.danhMuc] || '#4F4F4F';

  return (
    <div className="product-card">
      <div className="product-header" style={{ backgroundColor: headerColor }}>
        <h3 className="product-name">{product.ten}</h3>
        <span className="product-category">{product.danhMuc}</span>
      </div>

      <div className="product-body">
        <p className="product-description">{product.moTa}</p>
        <div className="product-info">
          <div className="info-item">
            <span className="info-label">Giá:</span>
            <span className="info-value price">{formatPrice(product.gia)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Số lượng:</span>
            <span className="info-value">{product.soLuong}</span>
          </div>
        </div>
      </div>

      <div className="product-actions">
        <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">
          Chi tiết
        </Link>
        <Link to={`/edit/${product.id}`} className="btn btn-warning btn-sm">
          Chỉnh sửa
        </Link>
        <button onClick={handleDelete} className="btn btn-danger btn-sm">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
