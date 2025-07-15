import { useState } from "react";

type PaginationResult<T> = {
  currentItems: T[];
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
};

function usePagination<T>(items: T[] | null | undefined, itemsPerPage: number): PaginationResult<T> {
  const [itemOffset, setItemOffset] = useState(0);

  // Safely handle undefined/null items
  const safeItems = Array.isArray(items) ? items : [];
  
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = safeItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(safeItems.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % Math.max(safeItems.length, 1);
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    currentItems,
    pageCount,
    handlePageClick,
  };
}

export default usePagination;