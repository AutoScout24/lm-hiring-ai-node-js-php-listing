import { Suspense } from "react";
import { Container, CircularProgress, Box, Typography } from "@mui/material";
import CarDetails from "@/components/CarDetails";
import carsData from "@/data/cars.json";

export async function generateMetadata({ params }) {
  const car = carsData.cars.find((car) => car.id === parseInt(params.id));

  if (!car) {
    return {
      title: "Car Not Found | Suzuki",
      description: "The requested car could not be found.",
    };
  }

  return {
    title: `${car.make} ${car.model} ${car.year} | Suzuki`,
    description: car.description.substring(0, 160),
    openGraph: {
      title: `${car.make} ${car.model} ${car.year}`,
      description: car.description.substring(0, 160),
      images: car.images[0] ? [car.images[0]] : [],
    },
  };
}

export default function CarPage({ params }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 2, md: 4 },
        mb: { xs: 4, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Loading car details...
            </Typography>
          </Box>
        }
      >
        <CarDetails id={params.id} />
      </Suspense>
    </Container>
  );
}
