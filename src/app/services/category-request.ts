import { CategoryResponse } from "../domain/category-response";



const categoryApiurl = "https://dummyjson.com"; 
export class CategoryService {
  async getCategories(): Promise<CategoryResponse[]> {
    try {
      const response = await fetch(`${categoryApiurl}/products/category-list`);
      if (!response.ok) {
        throw new Error("No se pudo cargar las categorías");
      }
      const data: CategoryResponse[] = await response.json(); 
      return data;
    } catch (error) {
      console.error("Ocurrió un error al cargar las categorías", error);
      throw new Error("Hubo un problema al obtener las categorías.");
    }
  }
}
