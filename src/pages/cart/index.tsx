import Layout from "@/components/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addCart, createOrder, updateCart } from "@/store/slices/cartSlice";
import { CartItem } from "@/types/cartSlicePage";
import {
  AddCircle,
  PropaneOutlined,
  QuestionMarkOutlined,
  RemoveCircle,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { Router, useRouter } from "next/router";

const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const products: CartItem[] = useAppSelector((store) => store.cartSlice.items);

  let totalPrice = 0;

  products.reduce((acc, cur) => {
    return (totalPrice = acc += cur.price * cur.quantity);
  }, 0);

  const handleCreateOrder = () => {
    dispatch(createOrder(products));
    router.push("/confirmation");
  };

  const addOrRemoveItem = (id: number, quantity: number) => {
    const itemUpdated = products.map((product) =>
      product.id === id ? { ...product, quantity: quantity } : product
    );
    const itemFiltered = itemUpdated.filter(
      (product) => product.quantity !== 0
    );

    console.log(itemFiltered);
    dispatch(updateCart(itemFiltered));
  };

  if (products.length <= 0) {
    return (
      <>
        <h1>nothing in the cart yet</h1>
      </>
    );
  }
  return (
    <Layout label="Cart">
      <Box>
        {products.map((ele) => {
          return (
            <Box
              key={ele.id} // Add a unique key prop when mapping over elements
              display="flex"
              justifyContent={"space-around"}
              alignItems="center" // Center items vertically
              padding="8px" // Add padding for spacing
              borderBottom="1px solid #ccc" // Add a border to separate items
            >
              <Box>
                <Image
                  src={ele.imageUrl || ""}
                  alt="image"
                  width={100}
                  height={100}
                />
              </Box>
              <Box sx={{ width: "250px" }}>
                <Typography>{ele.title}</Typography>
              </Box>

              <Box sx={{ width: "50px" }}>
                <Button
                  onClick={() => addOrRemoveItem(ele.id, ele.quantity - 1)}
                >
                  <RemoveCircle></RemoveCircle>
                </Button>
                <Typography>{ele.quantity}</Typography>
                <Button
                  onClick={() => addOrRemoveItem(ele.id, ele.quantity + 1)}
                >
                  <AddCircle></AddCircle>
                </Button>
              </Box>
              <Box sx={{ width: "150px" }}>
                <Typography>${ele.price * ele.quantity}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box display={"flex"} justifyContent={"space-evenly"} marginY={10}>
        <Typography variant="h3">Total Price is ${totalPrice}</Typography>
        <Button variant="contained" onClick={() => handleCreateOrder()}>
          Buy it
        </Button>
      </Box>
    </Layout>
  );
};

export default Cart;
