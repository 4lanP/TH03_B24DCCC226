import React, { createContext, useReducer, useCallback, ReactNode } from 'react';
import { Product, ProductAction, ProductContextType } from './types';
import { initialProducts } from './data';

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const productReducer = (state: Product[], action: ProductAction): Product[] => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.payload];
    case 'UPDATE_PRODUCT':
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    case 'DELETE_PRODUCT':
      return state.filter((product) => product.id !== action.payload);
    case 'SET_PRODUCTS':
      return action.payload;
    default:
      return state;
  }
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, dispatch] = useReducer(productReducer, initialProducts);

  const addProduct = useCallback(
    (product: Omit<Product, 'id'>) => {
      const newId = Math.max(...products.map((p) => p.id), 0) + 1;
      dispatch({
        type: 'ADD_PRODUCT',
        payload: { ...product, id: newId },
      });
    },
    [products]
  );

  const updateProduct = useCallback((product: Product) => {
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: product,
    });
  }, []);

  const deleteProduct = useCallback((id: number) => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: id,
    });
  }, []);

  const getProductById = useCallback(
    (id: number): Product | undefined => {
      return products.find((product) => product.id === id);
    },
    [products]
  );

  const value: ProductContextType = {
    products,
    dispatch,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within ProductProvider');
  }
  return context;
};
