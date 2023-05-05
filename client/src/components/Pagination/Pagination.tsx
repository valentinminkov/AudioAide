// components/Pagination/Pagination.tsx
import React from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from(Array(totalPages).keys()).map((i) => i + 1);

  return (
    <div className={styles.container}>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.btn} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
