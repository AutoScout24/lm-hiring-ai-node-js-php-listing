import { Suspense } from "react";
import { Container, CircularProgress, Box, Typography } from "@mui/material";
import CarDetails from "@/components/CarDetails";

const BACKEND_URL = process.env.BACKEND_API_URL;

async function fetchCar(id) {
  try {
    const res = await fetch(`${BACKEND_URL}/cars/${id}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await Promise.resolve(params);
  const car = await fetchCar(id);

  if (!car) {
    return {
      title: "Car Not Found | Suzuki",
      description: "The requested car could not be found.",
    };
  }

  return {
    title: `${car.make} ${car.model} ${car.year} | Suzuki`,
    description: car.description?.substring(0, 160) || "",
    openGraph: {
      title: `${car.make} ${car.model} ${car.year}`,
      description: car.description?.substring(0, 160) || "",
      images: car.images?.[0] ? [car.images[0]] : [],
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
