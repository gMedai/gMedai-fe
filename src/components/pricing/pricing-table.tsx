import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography, Avatar, CardActionArea } from "@mui/material";
import { Box } from "@mui/system";
import { useAuthContext } from "@contexts/auth-context";

export const PricingTable = ({ packagePay }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [remainingImages, setRemainingImages] = useState(0);
  const authContext: any = useAuthContext();
  const user = authContext.user;
  /* TODO: get from tenant, just for demo */
  const [pricing, setPricing] = useState([
    {
      id: 1,
      title: "10 images",
      amout: 10,
      price: "0",
      isSelected: false,
    },
    {
      id: 2,
      title: "50 images",
      amout: 50,
      price: "20",
      isSelected: false,
    },
    {
      id: 3,
      title: "100 images",
      amout: 100,
      price: "30",
      isSelected: false,
    },
  ]);

  /* TODO: get remaining images from tenant, just for demo
   */

  const getRemainingImages = async () => {
    // const response = await userService.getRemainImg(user.id);
    setRemainingImages(10);
  };

  const handlePackageSelect = (id) => () => {
    const updatedProps = pricing.map((pkg) => {
      if (pkg.id === id) {
        return {
          ...pkg,
          isSelected: true,
        };
      } else {
        return {
          ...pkg,
          isSelected: false,
        };
      }
    });
    const selectedPackage = updatedProps.find((pkg) => pkg.isSelected === true);
    setPricing(updatedProps);
    setSelectedPackage(selectedPackage);
    packagePay(selectedPackage);
  };

  useEffect(() => {
    const selectedPackage = pricing.find((pkg) => pkg.isSelected === true);
    setSelectedPackage(selectedPackage);
    getRemainingImages();
  }, [pricing]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        {pricing.map((plan) => (
          <Grid item key={plan.title} xs={12} sm={6} md={4}>
            <Card sx={plan.isSelected === true ? styles.pricingCardSelected : styles.pricingCard}>
              <CardActionArea onClick={handlePackageSelect(plan.id)}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={styles.pricingTitle} gutterBottom variant="overline">
                    {plan.title}
                  </Typography>
                  <Typography sx={styles.pricingPrice} variant="h4">
                    ${plan.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={styles.remain}>
        <Typography align="center" color="textPrimary" variant="overline">
          Your have:
        </Typography>
        <Typography align="center" color="textPrimary" variant="h4">
          {selectedPackage ? selectedPackage.amout + remainingImages : remainingImages} images
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  pricingCard: {
    borderRadius: 2,
    boxShadow: (theme) => theme.shadows[4],
    maxWidth: 400,
    backgroundColor: "#9182d1",
  },
  pricingCardSelected: {
    borderRadius: 2,
    boxShadow: (theme) => theme.shadows[4],
    maxWidth: 400,
    backgroundColor: "#9182d1",
  },
  CardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pricingTitle: {
    color: "white",
  },
  pricingPrice: {
    color: "white",
  },
  remain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    width: "50%",
  },
  pricingSelected: {
    color: "white",
  },
};