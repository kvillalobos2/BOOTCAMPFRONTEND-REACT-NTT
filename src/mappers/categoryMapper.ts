import { Category } from '../models/category';

export const categoryMapper = {
  toViewModel: (apiCategory: string): Category => ({
    value: apiCategory,
    label: apiCategory.charAt(0).toUpperCase() + apiCategory.slice(1)
  })
};
