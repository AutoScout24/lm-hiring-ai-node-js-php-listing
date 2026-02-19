import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const metadata = {
  title: "News & Reviews - Coming Soon | Suzuki",
  description:
    "Latest automotive news and car reviews, coming soon to Suzuki's car listings website.",
};

export default function NewsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          textAlign: "center",
          py: 10,
          px: 4,
          borderRadius: 4,
          background: "linear-gradient(145deg, #f0f4f8 0%, #e6f0ff 100%)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
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
          Coming Soon
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 700, mx: "auto" }}
        >
          We're working on bringing you the latest automotive news and expert
          reviews
        </Typography>

        <Divider sx={{ maxWidth: 100, mx: "auto", my: 4 }} />

        <Typography sx={{ mb: 4 }}>
          Stay tuned for in-depth car reviews, industry updates, and automotive
          news. Our team of experts is crafting high-quality content to help you
          make informed decisions about your next vehicle purchase.
        </Typography>

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
