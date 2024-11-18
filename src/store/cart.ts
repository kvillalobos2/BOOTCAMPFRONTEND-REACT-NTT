import { Product } from '../models/product';

export class CartStore {
  private items: Product[] = [];

  addItem(product: Product): void {
    this.items.push(product);
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  getItems(): Product[] {
    return [...this.items];
  }

  getCount(): number {
    return this.items.length;
  }
}