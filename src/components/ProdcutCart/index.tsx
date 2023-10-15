import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "@prisma/client";
interface Prop {
  item: Product;
}

const ProdcutCart = ({ item }: Prop) => {
  console.log(item);
  return (
    <Box>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={item.imageUrl || ""}
          alt="greeen iguana"
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {item.title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ color: "black" }}
          >
            ${item.price}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProdcutCart;
