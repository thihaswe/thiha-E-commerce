import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addCart } from "@/store/slices/cartSlice";
import { Box, Button, Typography } from "@mui/material";
import { Butterfly_Kids } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const ProductId = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.homeSlice.items);
  console.log(products);
  const param = useRouter();
  const productId = Number(param.query.id);
  const currentProduct = products.find((item) => item.id === productId);
  console.log(currentProduct);

  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Image
        style={{ borderRadius: "15px" }}
        width={280}
        height={280}
        src={currentProduct?.imageUrl || ""}
        alt="current product"
      />
      <Typography variant="h5" my={3}>
        {currentProduct?.title}{" "}
      </Typography>
      <Typography variant="body1" my={5}>
        {currentProduct?.description}
      </Typography>
      <Typography variant="h5"> ${currentProduct?.price}</Typography>
      <Box marginTop={5} display={"flex"} justifyContent={"center"}>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(addCart({ ...currentProduct }));
            router.push("/");
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductId;
