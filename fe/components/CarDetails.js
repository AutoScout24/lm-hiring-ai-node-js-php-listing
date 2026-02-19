"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  CircularProgress,
  Chip,
  Stack,
  Fade,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import CarImageCarousel from "./CarImageCarousel";
import Image from "next/image";

const formatIndianPrice = (price) => {
  if (!price) return "₹0";

  // Convert to string and remove any non-digit characters
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

const formatNumber = (number) => {
  if (!number) return "0";

  if (number >= 100000) {
    return (number / 100000).toFixed(1) + " Lakh";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0) + "K";
  }

  return number.toString();
};

export default function CarDetails({ id }) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cars/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 8, p: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Typography color="text.secondary" paragraph>
          We couldn't load the car details. Please try again later.
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
          startIcon={<ArrowBackIcon />}
        >
          Back to Listings
        </Button>
      </Box>
    );
  }

  if (!car) {
    return null;
  }

  // Ensure specifications exists and is an object
  const specifications = car.specifications || {};

  // Default features if none provided
  const features = car.features || [
    "Lane Departure Warning",
    "Adaptive Cruise Control",
    "Blind Spot Monitoring",
    "Apple CarPlay & Android Auto",
    "Keyless Entry",
    "Dual-Zone Climate Control",
  ];

  return (
    <Fade in={!loading} timeout={800}>
      <Box sx={{ pb: 8 }}>
        {/* Navigation */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/")}
            sx={{
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                transform: "translateX(-4px)",
                transition: "transform 0.2s",
              },
            }}
          >
            Back to Listings
          </Button>
        </Box>

        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  position: "relative",
                  height: {
                    xs: "250px", // Mobile
                    sm: "350px", // Tablet
                    md: "450px", // Desktop
                  },
                  width: "100%",
                  backgroundColor: "grey.100",
                  borderRadius: "8px 8px 0 0",
                  overflow: "hidden",
                }}
              >
                <CarImageCarousel
                  images={car.images || []}
                  make={car.make}
                  model={car.model}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ p: { xs: 2, sm: 4 } }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Box>
                      <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {car.year} {car.make} {car.model}
                      </Typography>

                      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                        <Chip
                          label={car.specifications?.fuelType || "Petrol"}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: 1 }}
                        />
                        <Chip
                          label={car.transmission}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: 1 }}
                        />
                        <Chip
                          label={car.type}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: 1 }}
                        />
                      </Stack>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 3,
                        }}
                      >
                        <Typography
                          variant="h3"
                          color="primary"
                          fontWeight="bold"
                        >
                          {formatIndianPrice(car.price)}
                        </Typography>
                      </Box>

                      <Divider sx={{ mb: 3 }} />

                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Description
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          mb: 3,
                          lineHeight: 1.7,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {car.description ||
                          `The ${car.make} ${
                            car.model
                          } continues to be a top-selling ${car.type.toLowerCase()} car. This model offers excellent fuel efficiency without sacrificing performance.`}
                      </Typography>

                      {/* Quick Specs Section - Similar to CardDekho */}
                      <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={3}>
                          <Card
                            sx={{
                              height: "100%",
                              textAlign: "center",
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <CardContent>
                              <CalendarMonthIcon
                                color="primary"
                                sx={{ fontSize: 30, mb: 1 }}
                              />
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Year
                              </Typography>
                              <Typography variant="body1" fontWeight="bold">
                                {car.year}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={3}>
                          <Card
                            sx={{
                              height: "100%",
                              textAlign: "center",
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <CardContent>
                              <SpeedIcon
                                color="primary"
                                sx={{ fontSize: 30, mb: 1 }}
                              />
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Mileage
                              </Typography>
                              <Typography variant="body1" fontWeight="bold">
                                {formatNumber(car.mileage)} km
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={3}>
                          <Card
                            sx={{
                              height: "100%",
                              textAlign: "center",
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <CardContent>
                              <LocalGasStationIcon
                                color="primary"
                                sx={{ fontSize: 30, mb: 1 }}
                              />
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Fuel Type
                              </Typography>
                              <Typography variant="body1" fontWeight="bold">
                                {specifications.fuelType || "Petrol"}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={3}>
                          <Card
                            sx={{
                              height: "100%",
                              textAlign: "center",
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <CardContent>
                              <SettingsIcon
                                color="primary"
                                sx={{ fontSize: 30, mb: 1 }}
                              />
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Transmission
                              </Typography>
                              <Typography variant="body1" fontWeight="bold">
                                {car.transmission}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>

                      <Divider sx={{ mb: 3 }} />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    {/* Specifications Panel */}
                    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ mb: 2 }}
                        >
                          Specifications
                        </Typography>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Engine
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {specifications.engine || "2.5L 4-Cylinder Hybrid"}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Horsepower
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {specifications.horsepower || "208 hp"}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Torque
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {specifications.torque || "163 lb-ft"}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Fuel Economy
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {specifications.fuelEconomy ||
                              "51 city / 53 highway"}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Dimensions
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {specifications.dimensions ||
                              "192.1″ L x 72.4″ W x 56.9″ H"}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Weight
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {specifications.weight || "3,472 lbs"}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>

                    {/* Features Panel */}
                    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ mb: 2 }}
                        >
                          Features
                        </Typography>
                        {features.map((feature, index) => (
                          <Box
                            key={index}
                            sx={{
                              mb: 1.5,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                mr: 1.5,
                              }}
                            />
                            <Typography variant="body2">{feature}</Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Contact Box */}
                    <Card
                      sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: "grey.100",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ mb: 2 }}
                        >
                          Interested?
                        </Typography>
                        <Typography variant="body2" paragraph>
                          Contact us today to schedule a test drive or request
                          more information about this vehicle.
                        </Typography>
                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{
                            py: 1.5,
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            boxShadow: 2,
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: 4,
                              transition: "all 0.2s",
                            },
                          }}
                        >
                          Contact Dealer
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Fade>
  );
}
