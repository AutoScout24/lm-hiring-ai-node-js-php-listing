import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideocamIcon from "@mui/icons-material/Videocam";

export const metadata = {
  title: "Video Reviews - Coming Soon | Suzuki",
  description:
    "Watch expert car video reviews and test drives, coming soon to Suzuki's car listings website.",
};

export default function VideosPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          textAlign: "center",
          py: 10,
          px: 4,
          borderRadius: 4,
          background: "linear-gradient(145deg, #f0f4f8 0%, #e6f2ff 100%)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <VideocamIcon
            sx={{
              fontSize: 80,
              color: "primary.main",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { opacity: 0.6, transform: "scale(0.95)" },
                "50%": { opacity: 1, transform: "scale(1.05)" },
                "100%": { opacity: 0.6, transform: "scale(0.95)" },
              },
            }}
          />
        </Box>

        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg, #1a4b8c 0%, #3b6db4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Video Content Coming Soon
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 700, mx: "auto" }}
        >
          We're creating high-quality video reviews and test drives
        </Typography>

        <Divider sx={{ maxWidth: 100, mx: "auto", my: 4 }} />

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ mb: 4, maxWidth: 900, mx: "auto" }}
        >
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                In-Depth Reviews
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed reviews of the latest car models covering performance,
                features, and value
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Test Drives
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-world test drives with expert commentary on handling,
                comfort, and drivability
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Comparison Videos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Side-by-side comparisons of similar models to help you choose
                the right car
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Button
          component={Link}
          href="/"
          variant="contained"
          size="large"
          startIcon={<ArrowBackIcon />}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
          }}
        >
          Back to Homepage
        </Button>
      </Paper>
    </Container>
  );
}
