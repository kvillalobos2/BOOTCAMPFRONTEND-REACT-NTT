
export const  productMapper = {
    toViewModel: (apiProduct) => ({
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
 
export const categoryMapper = {
    toViewModel: (apiCategory) => ({
      value: apiCategory,
      label: apiCategory.charAt(0).toUpperCase() + apiCategory.slice(1)
    })
  };
  