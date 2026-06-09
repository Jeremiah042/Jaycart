
export interface PopularProduct{
  id: number;
  name: string;
  price: number;
  discount: number;
  rating: number;
  category: string;
  instock: boolean;
  color: string;
  description?: string;
  returnDays: number;
  freeDelivery: boolean;
  reviews: number;
}