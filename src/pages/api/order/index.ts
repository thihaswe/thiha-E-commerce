// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from "@/types/cartSlicePage";
import { prisma } from "@/utils/db";
import { Prisma, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const cartItem: CartItem[] = req.body;
  const cartItemId = cartItem.map((item) => item.id);

  if (method === "POST") {
    const productsFromServer = await prisma.product.findMany({
      where: { id: { in: cartItemId } },
    });

    const getProductPriceWithQuantity = (item: CartItem) => {
      const product = productsFromServer.find(
        (product) => product.id === item.id
      ) as Product;
      return product?.price * item.quantity;
    };
    let totalPrice = 0;
    cartItem.forEach((item) => {
      const productPrice = getProductPriceWithQuantity(item);
      totalPrice += productPrice;
    });
    console.log(totalPrice);
  }

  res.status(200).json({ name: "John Doe" });
}
