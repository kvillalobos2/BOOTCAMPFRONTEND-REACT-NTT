
import { render, screen, fireEvent } from "@testing-library/react";
import CircularPagination from "../CircularPagination";

describe("CircularPagination Component", () => {
    const mockOnPageChange = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render the correct number of page buttons", () => {
        render(
            <CircularPagination
                totalPages={5}
                currentPage={1}
                onPageChange={mockOnPageChange}
            />
        );
        expect(screen.getAllByRole("button")).toHaveLength(7);
    });

    it('Should disable the previous button on the first page', () => {
        render(<CircularPagination currentPage={1} totalPages={5} onPageChange={function (): void {
            throw new Error("Function not implemented.");
        }} />);

        const prevButton = screen.getByRole('button', { name: /Previous page/i });
        expect(prevButton).toBeDisabled();
    });

    it('Should disable the next button on the last page', () => {
        render(<CircularPagination currentPage={5} totalPages={5} onPageChange={function (): void {
            throw new Error("Function not implemented.");
        }} />);

        const nextButton = screen.getByRole('button', { name: /Next page/i });
        expect(nextButton).toBeDisabled();
    });

    it("Should call onPageChange with the correct page number when a page button is clicked", () => {
        render(
            <CircularPagination
                totalPages={5}
                currentPage={2}
                onPageChange={mockOnPageChange}
            />
        );

        const page3Button = screen.getByText("3");
        fireEvent.click(page3Button);

        expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it("Should render ellipsis between non-consecutive pages", () => {
        render(
            <CircularPagination
                totalPages={10}
                currentPage={1}
                onPageChange={mockOnPageChange}
            />
        );

        expect(screen.getAllByText("...")).toHaveLength(1);
    });

    it("Should apply the active class to the current page button", () => {
        render(
            <CircularPagination
                totalPages={5}
                currentPage={3}
                onPageChange={mockOnPageChange}
            />
        );

        const activeButton = screen.getByText("3");
        expect(activeButton).toHaveClass("pagination__button--active");
    });

    it("Should call onPageChange with the correct page number when the previous button is clicked", () => {
        render(
            <CircularPagination
                totalPages={5}
                currentPage={3}
                onPageChange={mockOnPageChange}
            />
        );

        const prevButton = screen.getByRole('button', { name: /Previous page/i });
        fireEvent.click(prevButton);

        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("Should call onPageChange with the correct page number when the next button is clicked", () => {
        render(
            <CircularPagination
                totalPages={5}
                currentPage={3}
                onPageChange={mockOnPageChange}
            />
        );

        const nextButton = screen.getByRole('button', { name: /Next page/i });
        fireEvent.click(nextButton);
        expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

});
