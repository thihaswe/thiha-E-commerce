import { Product } from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartInitialState {
  items: CartItem[];
  isloading: boolean;
  error: Error | null;
}
