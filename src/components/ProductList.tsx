import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>Không tìm thấy sản phẩm nào phù hợp với tiêu chí tìm kiếm.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProductList;
