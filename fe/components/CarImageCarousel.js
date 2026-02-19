"use client";

import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function CarImageCarousel({
  images = [],
  make = "",
  model = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Ensure we have a valid images array
  const validImages =
    Array.isArray(images) && images.length > 0
      ? images
      : ["/car-placeholder-image.webp"];

  useEffect(() => {
    // Reset error state when images change
    setImageError(false);
  }, [images]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
    );
    setImageError(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
    );
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        width: "100%",
        height: isMobile ? 300 : 400,
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: theme.palette.grey[100],
        }}
      >
        {imageError ? (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <Image
              src="/images/car-placeholder.svg"
              alt={`${make} ${model} placeholder`}
              width={200}
              height={150}
              style={{ marginBottom: 16 }}
            />
            <Typography variant="body2" color="text.secondary">
              {make} {model} image not available
            </Typography>
          </Box>
        ) : (
          <Image
            src={validImages[currentIndex]}
            alt={`${make} ${model} - Image ${currentIndex + 1}`}
            fill
            style={{
              objectFit: "contain",
            }}
            priority={currentIndex === 0}
            onError={handleImageError}
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 75vw, 60vw"
          />
        )}
      </Box>

      {validImages.length > 1 && !imageError && (
        <>
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255, 255, 255, 0.8)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.9)",
              },
            }}
            aria-label="Previous image"
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255, 255, 255, 0.8)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.9)",
              },
            }}
            aria-label="Next image"
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
            }}
          >
            {validImages.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: index === currentIndex ? "primary.main" : "grey.300",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentIndex(index)}
                role="button"
                aria-label={`Go to image ${index + 1}`}
                tabIndex={0}
              />
            ))}
          </Box>
        </>
      )}
    </Paper>
  );
}
