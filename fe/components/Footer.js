"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#f8f9fa",
        color: "text.secondary",
        pt: 6,
        pb: 3,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{ mr: 1, position: "relative", width: 40, height: 40 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Suzuki"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, #1a4b8c 0%, #3b6db4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Suzuki
                </Typography>
              </Box>

              <Typography variant="body2" paragraph sx={{ mb: 3 }}>
                Suzuki is India's leading automobile company that helps users
                buy cars that are right for them.
              </Typography>

              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                Connect with Us
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  color="primary"
                  sx={{
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="primary"
                  sx={{
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="primary"
                  sx={{
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="primary"
                  sx={{
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  <YouTubeIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="primary"
                  sx={{
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
      </Container>
    </Box>
  );
}
