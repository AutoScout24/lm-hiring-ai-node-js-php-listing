"use client";

import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  useMediaQuery,
  useTheme,
  Pagination,
  Stack,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CarCard from "@/components/CarCard";
import FilterSidebar from "@/components/FilterSidebar";
import { useRouter, useSearchParams } from "next/navigation";

export default function CarListings({ searchParams }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const ITEMS_PER_PAGE = 12;

  const router = useRouter();
  const queryParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    // Get page from URL or default to 1
    const pageFromUrl = queryParams.get("page");
    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl));
    }

    // Get sort option from URL or default to relevance
    const sortFromUrl = queryParams.get("sortBy");
    if (sortFromUrl) {
      setSortBy(sortFromUrl);
    }

    const fetchCars = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        // Convert searchParams to a regular object if it's a Promise
        const resolvedParams = await Promise.resolve(searchParams);

        // Add all search params to the URL
        Object.entries(resolvedParams).forEach(([key, value]) => {
          if (value) {
            params.append(key, value);
          }
        });


        params.set("page", currentPage.toString());
        params.set("limit", ITEMS_PER_PAGE.toString());


        if (sortBy !== "relevance") {
          const [sort, order] = sortBy.split("-");
          params.set("sortBy", sort);
          params.set("sortOrder", order || "asc");
        }

        const response = await fetch(`/api/cars?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data = await response.json();
        setCars(data.cars);
        setTotalPages(data.totalPages);
        setTotalResults(data.totalResults || data.cars.length);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchParams, currentPage, sortBy, queryParams]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);

    
    const params = new URLSearchParams(queryParams.toString());
    params.set("sortBy", newSortBy);


    params.set("page", "1");
    setCurrentPage(1);

    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);

    // Update URL with new page
    const params = new URLSearchParams(queryParams.toString());
    params.set("page", newPage.toString());

    router.push(`/?${params.toString()}`);
  };

  if (error) {
    return (
      <Typography color="error" variant="h6">
        Error: {error}
      </Typography>
    );
  }

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "year-desc", label: "Newest First" },
    { value: "mileage-asc", label: "Mileage: Low to High" },
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <Grid container spacing={2} alignItems="flex-start" wrap="nowrap">
        {/* Filter Sidebar for Desktop */}
        <Grid
          item
          sx={{
            display: { xs: "none", md: "block" },
            width: 280,
            minWidth: 280,
            maxWidth: 280,
            pr: 0,
            pl: 0,
            mr: 2,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 20,
              height: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            <FilterSidebar />
          </Box>
        </Grid>

        <Grid
          item
          sx={{ flexGrow: 1, flexShrink: 1, width: "calc(100% - 300px)" }}
        >
          {/* Mobile Filter Button */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mb: 2, gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              fullWidth
              onClick={toggleDrawer}
              sx={{ py: 1 }}
            >
              Filters
            </Button>
          </Box>

          {/* Results Header */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="h6" component="h2" fontWeight="bold">
                {loading ? "Searching..." : `${totalResults} Cars Found`}
                {!loading && (
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1, display: { xs: "none", sm: "inline" } }}
                  >
                    Showing{" "}
                    {currentPage === 1
                      ? 1
                      : (currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
                    - {Math.min(currentPage * ITEMS_PER_PAGE, totalResults)} of{" "}
                    {totalResults}
                  </Typography>
                )}
              </Typography>

              <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  displayEmpty
                  size="small"
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{ borderRadius: 1 }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <SortIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">
                        Sort by:{" "}
                        {sortOptions.find((opt) => opt.value === selected)
                          ?.label || "Relevance"}
                      </Typography>
                    </Box>
                  )}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {loading ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {cars.map((car) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    key={car.id}
                    sx={{
                      display: "flex",
                      "& > *": {
                        width: "100%",
                        maxWidth: "100%",
                      },
                    }}
                  >
                    <CarCard car={car} />
                  </Grid>
                ))}
              </Grid>

              {cars.length === 0 && (
                <Paper sx={{ p: 4, textAlign: "center", mt: 4 }}>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    No cars found matching your criteria
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Try adjusting your filters or search term
                  </Typography>
                </Paper>
              )}

              {/* Pagination */}
              {cars.length > 0 && totalPages > 1 && (
                <Box
                  sx={{
                    mt: 5,
                    mb: 3,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      showFirstButton
                      showLastButton
                      size={isMobile ? "small" : "medium"}
                    />
                  </Stack>
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: { xs: "85%", sm: 350 },
            maxWidth: "100%",
          },
        }}
      >
        <Box sx={{ p: 2, maxHeight: "100vh", overflowY: "auto" }}>
          <FilterSidebar handleClose={toggleDrawer} />
        </Box>
      </Drawer>
    </Box>
  );
}
