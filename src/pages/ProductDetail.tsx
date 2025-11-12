import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, deleteProduct } = useProductContext();

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

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${product.ten}" không?`)) {
      deleteProduct(product.id);
      navigate('/');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <h1>{product.ten}</h1>
          <span className="category-badge">{product.danhMuc}</span>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h3>Thông tin sản phẩm</h3>
            <div className="detail-info">
              <div className="info-row">
                <span className="info-label">Giá:</span>
                <span className="info-value price">{formatPrice(product.gia)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Số lượng:</span>
                <span className="info-value">{product.soLuong}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Danh mục:</span>
                <span className="info-value">{product.danhMuc}</span>
              </div>
              <div className="info-row full-width">
                <span className="info-label">Mô tả:</span>
                <p className="info-value">{product.moTa}</p>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <Link to={`/edit/${product.id}`} className="btn btn-warning btn-lg">
              Chỉnh sửa
            </Link>
            <button onClick={handleDelete} className="btn btn-danger btn-lg">
              Xóa
            </button>
            <Link to="/" className="btn btn-secondary btn-lg">
              Quay lại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
