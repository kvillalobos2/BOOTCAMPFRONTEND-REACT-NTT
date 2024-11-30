
import { API_BASE_URL } from "../config/api-config";
import { CategoryResponse } from "../domain/category-response";

export const getCategories = async (): Promise<CategoryResponse[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category-list`);
    if (!response.ok) {
      throw new Error("No se pudo cargar las categorías");
    }
    const data: CategoryResponse[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Hubo un problema al obtener las categorías.");
  }
};
