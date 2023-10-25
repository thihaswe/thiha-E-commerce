import { Box, FormControl, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";
import { getProduct } from "@/store/slices/homeSlice";
import { Product } from "@prisma/client";
import Layout from "@/components/Layout";
import ProdcutCart from "@/components/ProdcutCart";
import Link from "next/link";
import SearchProduct from "@/components/SearchProduct";

export default function Home() {
  const dispatch = useAppDispatch();

  const products: Product[] = useAppSelector((store) => store.homeSlice.items);

  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProduct(products);
    }
  }, [products]);

  return (
    <Layout label="home">
      <SearchProduct
        products={products}
        setFilteredProduct={setFilteredProduct}
      ></SearchProduct>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredProduct.map((item) => {
          return (
            <Box key={item.id}>
              <Link
                href={`/product/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box width={"350px"} margin={"10px"}>
                  <ProdcutCart item={item}></ProdcutCart>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
}
