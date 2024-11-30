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



const HomePage: FC = () => {

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar productos
  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Ocurrió un problema al cargar los productos");
    }
  };

  // Cargar categorías
  const loadCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error al cargar las categorías", error);
    }
  };

  // Filtrar productos
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

  // Para cargar datos y filtrar productos
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery, products]);


  return (
    <>
      <Header />

      <SearchContainer
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={(category: string) => setSelectedCategory(category as Category)} 
        onSearchQueryChange={setSearchQuery}
      />

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
