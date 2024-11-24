import { ProductResponse } from "../domain/product-response";

const productApiUrl = 'https://dummyjson.com';

export const getProducts = async (): Promise<ProductResponse[]> => {
    try {
      const response = await fetch(`${productApiUrl}/products`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error('No se pudo cargar los productos');
      }
      return data.products;
    } catch (error) {
      throw new Error("Hubo un error para mostrar los productos");
    }
  };


