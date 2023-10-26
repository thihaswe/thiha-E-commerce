import { useAppSelector } from "@/store/hook";
import { Label, ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Button, TextField, Typography } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
  label: string;
}

const Layout = ({ children, label }: Prop) => {
  let totalProduct: number = 0;
  const products = useAppSelector((store) => store.cartSlice.items);
  products.map((item) => (totalProduct += item.quantity));
  const { data: session } = useSession();

  if (!session) {
    return (
      <Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          sx={{
            backgroundColor: "lightblue",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Box>
            <Typography variant="h5" color={"red"} marginBottom={"50px"}>
              YGN SHOOPING Log In Page
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
          >
            SIGN IN
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            backgroundColor: "lightblue",
            height: "100px",
            paddingX: "10px",
          }}
        >
          <Typography variant="h4">{label}</Typography>
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <Typography variant="h3">YGN shopping</Typography>
          </Link>
          <Button
            variant="contained"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Sign out
          </Button>
          <Link href={"/cart"}>
            <ShoppingCart sx={{ fontSize: "50px" }}></ShoppingCart>
            <Badge sx={{ marginTop: "-100px" }}>
              {totalProduct === 0 ? "" : totalProduct}
            </Badge>
          </Link>
        </Box>
        <Box display={"flex"} justifyContent={"center"}></Box>
        {children}
      </Box>
    );
  }
};

export default Layout;
