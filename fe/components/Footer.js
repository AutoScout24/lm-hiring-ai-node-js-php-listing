"use client";

import { useState, useEffect } from "react";
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
import { getBackendVersion } from "@/lib/api/services/version";
import packageJson from "../package.json";

export default function Footer() {
  const theme = useTheme();
  const [backendVersion, setBackendVersion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBackendVersion = async () => {
      try {
        const data = await getBackendVersion();
        setBackendVersion(data);
      } catch (error) {
        console.error("Failed to fetch backend version:", error);
        setBackendVersion({ error: true });
      } finally {
        setLoading(false);
      }
    };

    fetchBackendVersion();
  }, []);

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
              <Box sx={{ display: "flex", gap: 1, mb:3 }}>
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

              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                Technologies
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Frontend: Next.js {packageJson.dependencies.next.replace("^", "")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Backend:{" "}
                {loading
                    ? "Loading..."
                    : backendVersion?.error
                        ? "Unavailable"
                        : `Laravel ${backendVersion?.version} (PHP ${backendVersion?.php_version})`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
