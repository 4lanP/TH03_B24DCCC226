import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import { Category, FilterState } from '../types';

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const { products, deleteProduct } = useProductContext();
  const [filterState, setFilterState] = useState<FilterState>({
    searchTerm: '',
    selectedCategory: 'Tất cả',
    minPrice: 0,
    maxPrice: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.ten
        .toLowerCase()
        .includes(filterState.searchTerm.toLowerCase());
      const matchesCategory =
        filterState.selectedCategory === 'Tất cả' ||
        product.danhMuc === filterState.selectedCategory;
      const matchesMinPrice =
        filterState.minPrice === 0 || product.gia >= filterState.minPrice;
      const matchesMaxPrice =
        filterState.maxPrice === 0 || product.gia <= filterState.maxPrice;

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }, [products, filterState]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearchChange = (term: string) => {
    setFilterState((prev) => ({
      ...prev,
      searchTerm: term,
    }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: Category | 'Tất cả') => {
    setFilterState((prev) => ({
      ...prev,
      selectedCategory: category,
    }));
    setCurrentPage(1);
  };

  const handleMinPriceChange = (price: number) => {
    setFilterState((prev) => ({
      ...prev,
      minPrice: price,
    }));
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (price: number) => {
    setFilterState((prev) => ({
      ...prev,
      maxPrice: price,
    }));
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setFilterState({
      searchTerm: '',
      selectedCategory: 'Tất cả',
      minPrice: 0,
      maxPrice: 0,
    });
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Quản lý Sản phẩm</h1>
          <Link to="/add" className="btn btn-primary btn-lg">
            + Thêm sản phẩm mới
          </Link>
        </div>
      </div>

      <div className="page-content">
        <SearchBar
          searchTerm={filterState.searchTerm}
          onSearchChange={handleSearchChange}
        />

        <Filter
          selectedCategory={filterState.selectedCategory}
          minPrice={filterState.minPrice}
          maxPrice={filterState.maxPrice}
          onCategoryChange={handleCategoryChange}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          onReset={handleResetFilter}
        />

        <ProductList products={paginatedProducts} onDelete={deleteProduct} />

        {filteredProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onPageChange={handlePageChange}
            totalItems={filteredProducts.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
