export type Category = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';

export interface Product {
  id: number;
  ten: string;
  danhMuc: Category;
  gia: number;
  soLuong: number;
  moTa: string;
}

export interface ProductFormData {
  ten: string;
  danhMuc: Category;
  gia: string;
  soLuong: string;
  moTa: string;
}
 
export interface FormErrors {
  ten?: string;
  danhMuc?: string;
  gia?: string;
  soLuong?: string;
  moTa?: string;
}

export type ProductAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number }
  | { type: 'SET_PRODUCTS'; payload: Product[] };

export interface ProductContextType {
  products: Product[];
  dispatch: React.Dispatch<ProductAction>;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: Category | 'Tất cả';
  minPrice: number;
  maxPrice: number;
}
