import { Box, TextField } from "@mui/material";
import { Product } from "@prisma/client";
import React from "react";

interface Prop {
  products: Product[];
  setFilteredProduct: (para: Product[]) => void;
}

const SearchProduct = ({ products, setFilteredProduct }: Prop) => {
  const handleOnSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = e.target.value.toLowerCase();
    const searchResult = products.filter((product) =>
      product.title.toLowerCase().includes(searchText)
    );
    setFilteredProduct(searchResult);
  };
  return (
    <Box>
      <TextField
        placeholder="Search Products"
        sx={{ width: "800px" }}
        onChange={handleOnSearch}
      ></TextField>
    </Box>
  );
};

export default SearchProduct;
