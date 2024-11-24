
  export interface ProductResponse {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
    stock: number;
    discountPercentage: number;
  }
  export interface ProductInCart {
    product: ProductResponse;  
    quantity: number;  
  }

