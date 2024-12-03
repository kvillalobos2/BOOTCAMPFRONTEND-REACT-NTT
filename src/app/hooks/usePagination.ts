import { useMemo } from "react";

interface UsePaginationProps {
    totalPages: number;
    currentPage: number;
}

const usePagination = ({ totalPages, currentPage }: UsePaginationProps) => {
    const pageRange = useMemo(() => {
        const range = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
        } else {
            range.push(1);
            if (currentPage <= 3) {
                range.push(2, 3, 4);
            } else if (currentPage >= totalPages - 2) {
                range.push(totalPages - 3, totalPages - 2, totalPages - 1);
            } else {
                range.push(currentPage - 1, currentPage, currentPage + 1);
            }
            range.push(totalPages);
        }

        return range;
    }, [totalPages, currentPage]);

    return { pageRange };
};

export default usePagination;
