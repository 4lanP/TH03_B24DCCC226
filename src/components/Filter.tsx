import React from 'react';
import { Category } from '../types';

interface FilterProps {
  selectedCategory: Category | 'Tất cả';
  minPrice: number;
  maxPrice: number;
  onCategoryChange: (category: Category | 'Tất cả') => void;
  onMinPriceChange: (price: number) => void;
  onMaxPriceChange: (price: number) => void;
  onReset: () => void;
}

const categories: (Category | 'Tất cả')[] = ['Tất cả', 'Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}) => {
  return (
    <div className="filter">
      <div className="filter-section">
        <label className="filter-label">Danh mục:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category | 'Tất cả')}
          className="filter-select"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Giá (từ - đến):</label>
        <div className="price-range">
          <input
            type="number"
            placeholder="Giá từ"
            value={minPrice || ''}
            onChange={(e) => onMinPriceChange(Number(e.target.value) || 0)}
            className="filter-input"
          />
          <span className="separator">-</span>
          <input
            type="number"
            placeholder="Giá đến"
            value={maxPrice || ''}
            onChange={(e) => onMaxPriceChange(Number(e.target.value) || 0)}
            className="filter-input"
          />
        </div>
      </div>

      <button onClick={onReset} className="btn btn-reset">
        Đặt lại lọc
      </button>
    </div>
  );
};

export default Filter;
