import { Product } from "@prisma/client";

export interface Initialstate {
  items: Product[];
  isloading: boolean;
  error: Error | null;
}
