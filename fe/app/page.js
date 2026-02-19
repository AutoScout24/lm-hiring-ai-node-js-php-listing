import { Suspense } from "react";
import {
  Container,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import SearchBar from "@/components/SearchBar";
import QuickFilters from "@/components/QuickFilters";
import CarListings from "@/components/CarListings";

export default async function HomePage({ searchParams }) {
 
  const resolvedParams = await Promise.resolve(searchParams);

  return (
    <Box>
      {/* Hero Section with Search */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 5,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            Find Your Perfect Car
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Browse our wide selection of quality vehicles
          </Typography>

          <SearchBar />
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Quick Filters */}
        <QuickFilters />

        <Suspense
          fallback={
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 8 }}
            >
              <CircularProgress size={60} thickness={4} />
            </Box>
          }
        >
          <CarListings searchParams={resolvedParams} />
        </Suspense>
      </Container>
    </Box>
  );
}
