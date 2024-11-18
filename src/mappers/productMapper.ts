import { ApiProduct, Product } from '../models/product';

export const productMapper = {
  toViewModel: (apiProduct: ApiProduct): Product => ({
    id: apiProduct.id,
    title: apiProduct.title.toUpperCase(),
    description: apiProduct.description,
    price: apiProduct.price.toFixed(2),
    category: apiProduct.category,
    thumbnail: apiProduct.thumbnail,
    stock: apiProduct.stock,
    discountPercentage: Math.round(apiProduct.discountPercentage)
  })
};
