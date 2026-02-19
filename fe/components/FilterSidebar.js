"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SpeedIcon from "@mui/icons-material/Speed";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";

export default function FilterSidebar({ handleClose }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Convert prices from lakh to actual numbers
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [kilometers, setKilometers] = useState([0, 200000]);
  const [yearRange, setYearRange] = useState([2002, 2025]);
  const [selectedBodyType, setSelectedBodyType] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [accordionExpanded, setAccordionExpanded] = useState({
    price: true,
    brand: true,
    year: isMobile ? false : true,
    kilometers: isMobile ? false : true,
    fuel: isMobile ? false : true,
    type: isMobile ? false : true,
    transmission: isMobile ? false : true,
    category: true,
  });

  const [activeFilters, setActiveFilters] = useState(0);

  // Initialize filters from URL on component mount
  useEffect(() => {
    const minPrice = searchParams.get("minPrice") || 0;
    const maxPrice = searchParams.get("maxPrice") || 50 * 100000;
    setPriceRange([Number(minPrice) / 100000, Number(maxPrice) / 100000]);

    const minYear = searchParams.get("minYear") || 2002;
    const maxYear = searchParams.get("maxYear") || 2025;
    setYearRange([Number(minYear), Number(maxYear)]);

    const type = searchParams.get("type");
    if (type) {
      setSelectedBodyType(type.split(","));
    } else {
      setSelectedBodyType([]);
    }

    const fuelType = searchParams.get("fuelType");
    if (fuelType) {
      setSelectedFuelType(fuelType.split(","));
    } else {
      setSelectedFuelType([]);
    }

    const transmission = searchParams.get("transmission");
    if (transmission) {
      setSelectedTransmission(transmission.split(","));
    } else {
      setSelectedTransmission([]);
    }

    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category.split(","));
    } else {
      setSelectedCategory([]);
    }

    // Count active filters
    let count = 0;
    if (minPrice > 0 || maxPrice < 50 * 100000) count++;
    if (minYear > 2002 || maxYear < 2025) count++;
    if (type) count++;
    if (fuelType) count++;
    if (transmission) count++;
    if (category) count++;
    setActiveFilters(count);
  }, [searchParams]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setAccordionExpanded({
      ...accordionExpanded,
      [panel]: isExpanded,
    });
  };

  const applyFiltersToUrl = (params) => {
    router.replace(`/?${params.toString()}`, { scroll: false });
    if (handleClose && isMobile) {
      handleClose();
    }
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceChangeCommitted = (event, newValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", Math.round(newValue[0] * 100000).toString());
    params.set("maxPrice", Math.round(newValue[1] * 100000).toString());
    applyFiltersToUrl(params);
  };

  // reset the single filter type:-
  const handleResetSIngleFilter = (typeOfFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    switch (typeOfFilter) {
      case "price":
        setPriceRange([0, 50]);
        params.delete("minPrice");
        params.delete("maxPrice");
        break;
      case "year":
        setYearRange([2002, 2025]);
        params.delete("minYear");
        params.delete("maxYear");
        break;

      case "kilometers":
        setKilometers([0, 200000]);
        params.delete("minMileage");
        params.delete("maxMileage");
        break;
      default:
        break;
    }
    applyFiltersToUrl(params);
  };

  const handleKilometerChange = (event, newValue) => {
    setKilometers(newValue);
  };

  const handleKilometerChangeCommitted = (event, newValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minMileage", newValue[0].toString());
    params.set("maxMileage", newValue[1].toString());
    applyFiltersToUrl(params);
  };

  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const handleYearChangeCommitted = (event, newValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minYear", newValue[0].toString());
    params.set("maxYear", newValue[1].toString());
    applyFiltersToUrl(params);
  };

  const handleBodyTypeChange = (value) => {
    const updatedTypes = selectedBodyType.includes(value)
      ? selectedBodyType.filter((item) => item !== value)
      : [...selectedBodyType, value];

    setSelectedBodyType(updatedTypes);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedTypes.length > 0) {
      params.set("type", updatedTypes.join(","));
    } else {
      params.delete("type");
    }
    applyFiltersToUrl(params);
  };

  const handleFuelTypeChange = (value) => {
    const updatedTypes = selectedFuelType.includes(value)
      ? selectedFuelType.filter((item) => item !== value)
      : [...selectedFuelType, value];

    setSelectedFuelType(updatedTypes);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedTypes.length > 0) {
      params.set("fuelType", updatedTypes.join(","));
    } else {
      params.delete("fuelType");
    }
    applyFiltersToUrl(params);
  };

  const handleTransmissionChange = (value) => {
    const updatedTypes = selectedTransmission.includes(value)
      ? selectedTransmission.filter((item) => item !== value)
      : [...selectedTransmission, value];

    setSelectedTransmission(updatedTypes);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedTypes.length > 0) {
      params.set("transmission", updatedTypes.join(","));
    } else {
      params.delete("transmission");
    }
    applyFiltersToUrl(params);
  };

  const handleCategoryChange = (value) => {
    const updatedCategories = selectedCategory.includes(value)
      ? selectedCategory.filter((item) => item !== value)
      : [...selectedCategory, value];

    setSelectedCategory(updatedCategories);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedCategories.length > 0) {
      params.set("category", updatedCategories.join(","));
    } else {
      params.delete("category");
    }
    applyFiltersToUrl(params);
  };

  const handleQuickPriceSelect = (min, max) => {
    // If the same range is clicked again, reset to default range
    if (priceRange[0] === min && priceRange[1] === max) {
      setPriceRange([0, 50]);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("minPrice");
      params.delete("maxPrice");
      applyFiltersToUrl(params);
      return;
    }

    setPriceRange([min, max]);
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", Math.round(min * 100000).toString());
    params.set("maxPrice", Math.round(max * 100000).toString());
    applyFiltersToUrl(params);
  };

  const handleResetFilters = () => {
    setPriceRange([0, 50]);
    setKilometers([0, 200000]);
    setYearRange([2002, 2025]);
    setSelectedBodyType([]);
    setSelectedFuelType([]);
    setSelectedTransmission([]);
    setSelectedCategory([]);

    const params = new URLSearchParams();
    // Preserve search term if any
    const search = searchParams.get("search");
    if (search) {
      params.set("search", search);
    }

    // Preserve sort if any
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);

    applyFiltersToUrl(params);
  };

  const bodyTypes = [
    { name: "Hatchback", icon: <DirectionsCarIcon fontSize="small" /> },
    { name: "Sedan", icon: <DirectionsCarIcon fontSize="small" /> },
    { name: "SUV", icon: <DirectionsCarIcon fontSize="small" /> },
    { name: "Luxury SUV", icon: <DirectionsCarIcon fontSize="small" /> },
    { name: "Electric", icon: <DirectionsCarIcon fontSize="small" /> },
    { name: "Hybrid", icon: <DirectionsCarIcon fontSize="small" /> },
  ];

  const fuelTypes = [
    { name: "Petrol", icon: <LocalGasStationIcon fontSize="small" /> },
    { name: "Diesel", icon: <LocalGasStationIcon fontSize="small" /> },
    { name: "Electric", icon: <LocalGasStationIcon fontSize="small" /> },
    { name: "Hybrid", icon: <LocalGasStationIcon fontSize="small" /> },
    { name: "CNG", icon: <LocalGasStationIcon fontSize="small" /> },
  ];

  const transmissionTypes = [
    { name: "Automatic", icon: <SettingsIcon fontSize="small" /> },
    { name: "Manual", icon: <SettingsIcon fontSize="small" /> },
    { name: "CVT", icon: <SettingsIcon fontSize="small" /> },
  ];

  const categoryTypes = [
    {
      name: "new",
      icon: <TimeToLeaveIcon fontSize="small" />,
      label: "New Cars",
    },
    {
      name: "used",
      icon: <TimeToLeaveIcon fontSize="small" />,
      label: "Used Cars",
    },
  ];

  const brandList = [
    "Maruti Suzuki",
    "Hyundai",
    "Tata",
    "Mahindra",
    "Kia",
    "Honda",
    "Toyota",
    "MG",
    "Skoda",
    "Volkswagen",
  ];

  const filteredBrands = brandSearch
    ? brandList.filter((brand) =>
        brand.toLowerCase().includes(brandSearch.toLowerCase())
      )
    : brandList;

  return (
    <Box sx={{ p: 2 }}>
      {/* Filter Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Filters
          {activeFilters > 0 && (
            <Chip
              size="small"
              label={activeFilters}
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        {isMobile && (
          <IconButton onClick={handleClose} edge="end">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Category Filter */}
      <Accordion
        disableGutters
        expanded={accordionExpanded.category}
        onChange={handleAccordionChange("category")}
        sx={{ mb: 1, boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Category
          </Typography>
          {selectedCategory.length > 0 && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleResetSIngleFilter("category");
              }}
            >
              <RestartAltIcon fontSize="small" />
            </IconButton>
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <FormGroup>
              {categoryTypes.map((category) => (
                <FormControlLabel
                  key={category.name}
                  control={
                    <Checkbox
                      checked={selectedCategory.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {category.icon}
                      <Typography variant="body2">{category.label}</Typography>
                    </Box>
                  }
                />
              ))}
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ mb: 1 }} />

      {/* Price Range */}
      <Accordion
        disableGutters
        expanded={accordionExpanded.price}
        onChange={handleAccordionChange("price")}
        sx={{ mb: 1, boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Price Range
          </Typography>
          {(priceRange[0] > 0 || priceRange[1] < 50) && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleResetSIngleFilter("price");
              }}
            >
              <RestartAltIcon fontSize="small" />
            </IconButton>
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                ₹{priceRange[0]} Lakh
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{priceRange[1]} Lakh+
              </Typography>
            </Box>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={50}
              step={0.5}
              valueLabelFormat={(value) => `₹${value}L`}
            />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mt: 2,
              }}
            >
              <Chip
                label="Under ₹5 Lakh"
                onClick={() => handleQuickPriceSelect(0, 5)}
                clickable
                size="small"
                color={
                  priceRange[0] === 0 && priceRange[1] === 5
                    ? "primary"
                    : "default"
                }
              />
              <Chip
                label="₹5-10 Lakh"
                onClick={() => handleQuickPriceSelect(5, 10)}
                clickable
                size="small"
                color={
                  priceRange[0] === 5 && priceRange[1] === 10
                    ? "primary"
                    : "default"
                }
              />
              <Chip
                label="₹10-20 Lakh"
                onClick={() => handleQuickPriceSelect(10, 20)}
                clickable
                size="small"
                color={
                  priceRange[0] === 10 && priceRange[1] === 20
                    ? "primary"
                    : "default"
                }
              />
              <Chip
                label="Above ₹20 Lakh"
                onClick={() => handleQuickPriceSelect(20, 50)}
                clickable
                size="small"
                color={
                  priceRange[0] === 20 && priceRange[1] === 50
                    ? "primary"
                    : "default"
                }
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ mb: 1 }} />

      {/* Year */}
      <Accordion
        disableGutters
        expanded={accordionExpanded.year}
        onChange={handleAccordionChange("year")}
        sx={{ mb: 1, boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Year
          </Typography>
          {(yearRange[0] > 2002 || yearRange[1] < 2025) && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleResetSIngleFilter("year");
              }}
            >
              <RestartAltIcon fontSize="small" />
            </IconButton>
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {yearRange[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {yearRange[1]}
              </Typography>
            </Box>
            <Slider
              value={yearRange}
              onChange={handleYearChange}
              onChangeCommitted={handleYearChangeCommitted}
              valueLabelDisplay="auto"
              min={2002}
              max={2025}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ mb: 1 }} />

      {/* Brand */}
      <Accordion
        disableGutters
        expanded={accordionExpanded.brand}
        onChange={handleAccordionChange("brand")}
        sx={{ mb: 1, boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Brand
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <TextField
            fullWidth
            placeholder="Search for brands"
            variant="outlined"
            size="small"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {filteredBrands.map((brand) => (
              <Chip
                key={brand}
                label={brand}
                variant="outlined"
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("make", brand);
                  applyFiltersToUrl(params);
                }}
                size="small"
                color="primary"
                clickable
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ mb: 1 }} />

      {/* Kilometers */}
      <Accordion
        disableGutters
        expanded={accordionExpanded.kilometers}
        onChange={handleAccordionChange("kilometers")}
        sx={{ mb: 1, boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Kilometers Driven
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {kilometers[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {kilometers[1]}
              </Typography>
            </Box>
            <Slider
              value={kilometers}
              onChange={handleKilometerChange}
              onChangeCommitted={handleKilometerChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={200000}
              step={5000}
              marks={[
                { value: 0, label: "0" },
                { value: 200000, label: "2L" },
              ]}
              valueLabelFormat={(value) => `${(value / 1000).toFixed(0)}K km`}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ mb: 1 }} />

      {/* Fuel Type */}
      <Accordion
        disableGutters
        expanded={accordionExpanded.fuel}
        onChange={handleAccordionChange("fuel")}
        sx={{ mb: 1, boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Fuel Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <FormGroup>
              {fuelTypes.map((type) => (
                <FormControlLabel
                  key={type.name}
                  control={
                    <Checkbox
                      checked={selectedFuelType.includes(type.name)}
                      onChange={() => handleFuelTypeChange(type.name)}
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {type.icon}
                      <Typography variant="body2">{type.name}</Typography>
                    </Box>
                  }
                />
              ))}
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ mb: 1 }} />

      {/* Type of Vehicle */}
      <Accordion
        disableGutters
        expanded={accordionExpanded.type}
        onChange={handleAccordionChange("type")}
        sx={{ mb: 1, boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Vehicle Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <FormGroup>
              {bodyTypes.map((type) => (
                <FormControlLabel
                  key={type.name}
                  control={
                    <Checkbox
                      checked={selectedBodyType.includes(type.name)}
                      onChange={() => handleBodyTypeChange(type.name)}
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {type.icon}
                      <Typography variant="body2">{type.name}</Typography>
                    </Box>
                  }
                />
              ))}
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ mb: 1 }} />

      {/* Transmission */}
      <Accordion
        disableGutters
        expanded={accordionExpanded.transmission}
        onChange={handleAccordionChange("transmission")}
        sx={{ mb: 1, boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Transmission
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <FormGroup>
              {transmissionTypes.map((type) => (
                <FormControlLabel
                  key={type.name}
                  control={
                    <Checkbox
                      checked={selectedTransmission.includes(type.name)}
                      onChange={() => handleTransmissionChange(type.name)}
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {type.icon}
                      <Typography variant="body2">{type.name}</Typography>
                    </Box>
                  }
                />
              ))}
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ mb: 1 }} />

      {/* Reset Button */}
      <Box
        sx={{
          display: "flex",
          mt: 2,
          position: "sticky",
          bottom: 0,
          bgcolor: "background.paper",
          pt: 2,
          pb: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleResetFilters}
          startIcon={<RestartAltIcon />}
          fullWidth
        >
          Reset All Filters
        </Button>
      </Box>
    </Box>
  );
}
