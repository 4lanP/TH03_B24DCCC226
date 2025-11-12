import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductFormData, FormErrors, Category } from '../types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'> | Product) => void;
  isEditMode?: boolean;
}

const categories: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  isEditMode = false,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>({
    ten: product?.ten || '',
    danhMuc: product?.danhMuc || 'Điện tử',
    gia: product?.gia.toString() || '',
    soLuong: product?.soLuong.toString() || '',
    moTa: product?.moTa || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.ten.trim()) {
      newErrors.ten = 'Tên sản phẩm là bắt buộc';
    } else if (formData.ten.trim().length < 3) {
      newErrors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự';
    }

    if (!formData.danhMuc) {
      newErrors.danhMuc = 'Danh mục là bắt buộc';
    }

    if (!formData.gia) {
      newErrors.gia = 'Giá là bắt buộc';
    } else if (isNaN(Number(formData.gia)) || Number(formData.gia) <= 0) {
      newErrors.gia = 'Giá phải là số dương';
    }

    if (!formData.soLuong) {
      newErrors.soLuong = 'Số lượng là bắt buộc';
    } else if (!Number.isInteger(Number(formData.soLuong)) || Number(formData.soLuong) < 0) {
      newErrors.soLuong = 'Số lượng phải là số nguyên không âm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'ten':
        if (!value.trim()) {
          newErrors.ten = 'Tên sản phẩm là bắt buộc';
        } else if (value.trim().length < 3) {
          newErrors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự';
        } else {
          delete newErrors.ten;
        }
        break;
      case 'danhMuc':
        if (!value) {
          newErrors.danhMuc = 'Danh mục là bắt buộc';
        } else {
          delete newErrors.danhMuc;
        }
        break;
      case 'gia':
        if (!value) {
          newErrors.gia = 'Giá là bắt buộc';
        } else if (isNaN(Number(value)) || Number(value) <= 0) {
          newErrors.gia = 'Giá phải là số dương';
        } else {
          delete newErrors.gia;
        }
        break;
      case 'soLuong':
        if (!value) {
          newErrors.soLuong = 'Số lượng là bắt buộc';
        } else if (!Number.isInteger(Number(value)) || Number(value) < 0) {
          newErrors.soLuong = 'Số lượng phải là số nguyên không âm';
        } else {
          delete newErrors.soLuong;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditMode && product) {
      onSubmit({
        ...product,
        ten: formData.ten,
        danhMuc: formData.danhMuc,
        gia: Number(formData.gia),
        soLuong: Number(formData.soLuong),
        moTa: formData.moTa,
      });
    } else {
      onSubmit({
        ten: formData.ten,
        danhMuc: formData.danhMuc,
        gia: Number(formData.gia),
        soLuong: Number(formData.soLuong),
        moTa: formData.moTa,
      });
    }

    navigate('/');
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="ten" className="form-label">
          Tên sản phẩm *
        </label>
        <input
          type="text"
          id="ten"
          name="ten"
          value={formData.ten}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${errors.ten && touched.ten ? 'is-invalid' : ''}`}
          placeholder="Nhập tên sản phẩm"
        />
        {errors.ten && touched.ten && <span className="error-message">{errors.ten}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="danhMuc" className="form-label">
          Danh mục *
        </label>
        <select
          id="danhMuc"
          name="danhMuc"
          value={formData.danhMuc}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${errors.danhMuc && touched.danhMuc ? 'is-invalid' : ''}`}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.danhMuc && touched.danhMuc && (
          <span className="error-message">{errors.danhMuc}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="gia" className="form-label">
            Giá (VNĐ) *
          </label>
          <input
            type="number"
            id="gia"
            name="gia"
            value={formData.gia}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.gia && touched.gia ? 'is-invalid' : ''}`}
            placeholder="Nhập giá"
          />
          {errors.gia && touched.gia && <span className="error-message">{errors.gia}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="soLuong" className="form-label">
            Số lượng *
          </label>
          <input
            type="number"
            id="soLuong"
            name="soLuong"
            value={formData.soLuong}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.soLuong && touched.soLuong ? 'is-invalid' : ''}`}
            placeholder="Nhập số lượng"
          />
          {errors.soLuong && touched.soLuong && (
            <span className="error-message">{errors.soLuong}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="moTa" className="form-label">
          Mô tả
        </label>
        <textarea
          id="moTa"
          name="moTa"
          value={formData.moTa}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control"
          placeholder="Nhập mô tả sản phẩm"
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
