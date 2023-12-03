import React from "react";
import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const products = [
  {
    id: uuid(),
    name: "Nguyen Van A",
    imageUrl: "/static/images/avatars/avatar_1.png",
    purchaseTimeAgo: "3 minutes ago",
    purchaseCount: 20,
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    name: "Nguyen Van B",
    imageUrl: "/static/images/avatars/avatar_2.png",
    purchaseTimeAgo: "20 minutes ago",
    purchaseCount: 30,
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    name: "Nguyen Van C",
    imageUrl: "/static/images/avatars/avatar_3.png",
    purchaseTimeAgo: "1 hours ago",
    purchaseCount: 100,
    updatedAt: subHours(Date.now(), 3),
  },
  {
    id: uuid(),
    name: "Nguyen Van D",
    imageUrl: "/static/images/avatars/avatar_4.png",
    purchaseTimeAgo: "2 hours ago",
    purchaseCount: 200,
    updatedAt: subHours(Date.now(), 5),
  },
  {
    id: uuid(),
    name: "Nguyen Van E",
    imageUrl: "/static/images/avatars/avatar_5.png",
    purchaseTimeAgo: "4 hours ago",
    purchaseCount: 50,
    updatedAt: subHours(Date.now(), 9),
  },
];

export const LatestProducts = (props) => (
  <Card {...props}>
    <CardHeader subtitle={`${products.length} in total`} title="Latest Transactions" />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem divider={i < products.length - 1} key={product.id}>
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48,
              }}
            />
          </ListItemAvatar>
          <ListItemText primary={product.name} secondary={`${product.purchaseTimeAgo}`} />
          <div style={{ marginLeft: "auto" }}>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body2" style={{ fontSize: "12px", color: "green" }}>
                  {`+${product.purchaseCount} images`}
                </Typography>
              }
            />
          </div>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
        View all
      </Button>
    </Box>
  </Card>
);
