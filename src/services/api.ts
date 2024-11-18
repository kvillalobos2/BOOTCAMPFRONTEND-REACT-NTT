import { ApiProduct } from '../models/product';
import { ApiResponse } from '../types/apiResponse';


const API_BASE_URL = 'https://dummyjson.com';

export const ProductService = {
  async getAll(): Promise<ApiResponse<{ products: ApiProduct[] }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('No se pudo cargar los productos');
      }
      const data = await response.json();
      return { success: true, data }; 
    } catch (error: unknown) {
      console.error('Ocurrió un error al cargar los productos', error);
      return { success: false, data: { products: [] }, error: (error as Error).message };
    }
  },

  async getCategories(): Promise<ApiResponse<string[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category-list`);
      if (!response.ok) {
        throw new Error('No se pudo cargar las categorías');
      }
      const data: string[] = await response.json();  
      return { success: true, data };
    } catch (error: unknown) {
      console.error('Ocurrió un error al cargar las categorías', error);
      return { success: false, data: [], error: 'Error al cargar las categorías' };
    }
  }
};
