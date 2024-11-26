import { FC } from "react";
import "./SearchContainer.css";
import { CategoryResponse } from "../../domain/category-response";

interface SearchContainerProps {
  categories: CategoryResponse[];
  selectedCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchQueryChange: (query: string) => void;
  placeholder?: string;
}

const SearchContainer: FC<SearchContainerProps> = ({
  categories,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchQueryChange,
  placeholder = "Buscar...",
}) => {
  // los estilos deber'ian estar al mismo nivel del componente de lo contrario ser'a dificil reutiliarlo en otro ambito
  return (
    <div className="search__container">
      <select
        className="search__category-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="search__input-wrapper">
        <input
          type="text"
          className="search__input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchContainer;
