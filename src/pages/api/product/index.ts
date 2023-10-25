import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send("unauthorized");
  }

  if (method === "GET") {
    const product = await prisma.product.findMany();
    return res.send(product);
  }
}
