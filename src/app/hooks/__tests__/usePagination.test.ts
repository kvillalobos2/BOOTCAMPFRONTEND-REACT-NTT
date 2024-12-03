import { renderHook } from "@testing-library/react";
import usePagination from "../usePagination";

describe('usePagination', () => {
  it('Should return the correct page range when totalPages is less than or equal to 5', () => {
    const { result } = renderHook(() => usePagination({ totalPages: 3, currentPage: 1 }));
    expect(result.current.pageRange).toEqual([1, 2, 3]);
  });

  it('Should return the correct page range when totalPages is greater than 5 and currentPage is at the beginning', () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10, currentPage: 2 }));
    expect(result.current.pageRange).toEqual([1, 2, 3, 4, 10]);
  });

  it('Should return the correct page range when totalPages is greater than 5 and currentPage is in the middle', () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10, currentPage: 5 }));
    expect(result.current.pageRange).toEqual([1, 4, 5, 6, 10]);
  });

  it('Should return the correct page range when totalPages is greater than 5 and currentPage is near the end', () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10, currentPage: 9 }));
    expect(result.current.pageRange).toEqual([1, 7, 8, 9, 10]);
  });

  it('Should return the correct page range when totalPages is greater than 5 and currentPage is the last page', () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10, currentPage: 10 }));
    expect(result.current.pageRange).toEqual([1, 7, 8, 9, 10]);
  });
});
