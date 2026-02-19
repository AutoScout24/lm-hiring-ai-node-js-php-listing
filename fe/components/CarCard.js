"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  LocalGasStation,
  Speed,
  Settings,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const formatIndianPrice = (price) => {
  if (!price) return "₹0";

  const priceStr = price.toString().replace(/\D/g, "");

  let lastThree = priceStr.substring(priceStr.length - 3);
  let otherNumbers = priceStr.substring(0, priceStr.length - 3);

  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }

  // Format remaining digits with commas for lakhs and crores
  let formattedPrice =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return `₹${formattedPrice}`;
};

// Format number in a user-friendly way (e.g., 12000 -> 12K)
const formatNumber = (number) => {
  if (!number) return "0";

  if (number >= 100000) {
    return (number / 100000).toFixed(1) + " Lakh";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0) + "K";
  }

  return number.toString();
};

const CarCard = ({ car }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    router.push(`/cars/${car.id}`);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % car.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.2s",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-4px)",
          },
        }}
        onClick={handleCardClick}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "66.67%",
            backgroundColor: "grey.100",
            overflow: "hidden",
          }}
        >
          {car.featured && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                left: 0,
                zIndex: 1,
                bgcolor: "primary.main",
                color: "white",
                py: 0.5,
                px: 1.5,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                fontWeight: "bold",
                fontSize: "0.75rem",
              }}
            >
              FEATURED
            </Box>
          )}
          <CardMedia
            component="img"
            image={car.images?.[0] || "/car-placeholder-image.webp"}
            alt={`${car.make} ${car.model}`}
            onClick={handleImageClick}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              backgroundColor: "grey.100",
              transform: "scale(1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              width: 36,
              height: 36,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>

        <CardContent sx={{ p: 2, flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 0.5,
            }}
          >
            {car.year} {car.make} {car.model}
          </Typography>

          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: "bold",
              mb: 1.5,
            }}
          >
            {formatIndianPrice(car.price)}
          </Typography>

          <Divider sx={{ mb: 1.5 }} />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 1.5,
              fontSize: "0.875rem",
              color: "text.secondary",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Speed fontSize="small" />
              <Typography variant="body2">
                {formatNumber(car.mileage || 12047)} km
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocalGasStation fontSize="small" />
              <Typography variant="body2">
                {car.specifications?.fuelType || car.fuelType || "Petrol"}
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Settings fontSize="small" />
              <Typography variant="body2">{car.transmission}</Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1.5,
            }}
          >
            <Button
              variant="text"
              color="primary"
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: "medium",
              }}
            >
              View Details →
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ position: "relative", height: "60vh" }}>
            <CardMedia
              component="img"
              image={
                car.images?.[selectedImage] || "/car-placeholder-image.webp"
              }
              alt={`${car.make} ${car.model}`}
              sx={{
                height: "100%",
                objectFit: "contain",
              }}
            />
            {car.images && car.images.length > 1 && (
              <>
                <IconButton
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                  onClick={handlePrevImage}
                >
                  {"<"}
                </IconButton>
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                  onClick={handleNextImage}
                >
                  {">"}
                </IconButton>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CarCard;
