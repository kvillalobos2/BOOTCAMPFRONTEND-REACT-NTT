import { FC, useState, useEffect } from "react";
import Header from "../../components/header/Header";
import ProductCard from "../../components/product/ProductCard";
import { ProductResponse } from "../../domain/product-response";
import { getProducts } from "../../services/product-request";
import SearchContainer from "../../components/search/SearchContainer";
import { CategoryResponse } from "../../domain/category-response";
import Footer from "../../components/footer/Footer";
import { getCategories } from "@/app/services/category-request";
import { Category } from "@/app/domain/category-enum";
import withAuth from "@/hoc/auth/authHoc";
import CircularPagination from "../../components/pagination/CircularPagination";

const HomePage: FC = () => {

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1); 
  const [productsPerPage] = useState(6); 


  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Ocurrió un problema al cargar los productos");
    }
  };


  const loadCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error al cargar las categorías", error);
    }
  };

  
  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== Category.All) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery.trim() !== "") {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProducts(filtered);
  };

 
  const handlePageChange = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

 
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery, products]);

 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <Header/>

      <SearchContainer
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={(category: string) => setSelectedCategory(category as Category)}
        onSearchQueryChange={setSearchQuery}
      />

      <div className="product-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>

  
      {totalPages > 1 && (
        <CircularPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      <Footer />
    </>
  );
};

export default withAuth(HomePage);
