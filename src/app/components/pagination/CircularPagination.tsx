import React from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./CircularPagination.css";
import usePagination from "@/app/hooks/usePagination";

interface CircularPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const CircularPagination: React.FC<CircularPaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const { pageRange } = usePagination({ totalPages, currentPage });

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`pagination__button ${
                    currentPage === 1 ? "pagination__button--disabled" : ""
                }`}
            >
                <FaArrowLeft />
            </button>

            {pageRange.map((pageNum, index, array) => {
                const showEllipsis = index > 0 && pageNum - array[index - 1] > 1;

                return (
                    <React.Fragment key={pageNum}>
                        {showEllipsis && (
                            <span className="pagination__ellipsis">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(pageNum)}
                            className={`pagination__button ${
                                currentPage === pageNum
                                    ? "pagination__button--active"
                                    : ""
                            }`}
                        >
                            {pageNum}
                        </button>
                    </React.Fragment>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`pagination__button ${
                    currentPage === totalPages
                        ? "pagination__button--disabled"
                        : ""
                }`}
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default CircularPagination;
