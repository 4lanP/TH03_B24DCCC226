import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)} className="btn btn-page">
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots-start" className="dots">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`btn btn-page ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots-end" className="dots">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="btn btn-page"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        <p>
          Hiển thị {Math.min(currentPage * itemsPerPage - itemsPerPage + 1, totalItems)}-
          {Math.min(currentPage * itemsPerPage, totalItems)} trong {totalItems} sản phẩm
        </p>
        <p className="page-info">
          Trang {currentPage} / {totalPages}
        </p>
      </div>

      <div className="pagination-controls">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="btn btn-prev"
        >
          ← Trước
        </button>

        <div className="page-numbers">{renderPageNumbers()}</div>

        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="btn btn-next"
        >
          Sau →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
