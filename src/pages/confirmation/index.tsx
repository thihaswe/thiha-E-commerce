import ConfirmationBox from "@/components/ConfirmationBox";
import { useAppSelector } from "@/store/hook";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  Snackbar,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";

import React, { useState } from "react";

const confirmation = () => {
  const price = useAppSelector((store) => store.orderSlice.price);
  const [open, setOpen] = useState(false);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      sx={{ backgroundColor: "lightblue" }}
    >
      <Typography> Your total price is {price}</Typography>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Confirm Order
      </Button>

      <ConfirmationBox open={open} setOpen={setOpen} />
    </Box>
  );
};

export default confirmation;
