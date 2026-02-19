import { Inter } from "next/font/google";
import RootStyleRegistry from "@/app/registry";
import { Box } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Suzuki - Find Your Perfect Car",
  description:
    "Suzuki is your trusted destination for finding the perfect car. Browse through our extensive collection of new and used cars.",
  keywords:
    "car listings, used cars, new cars, car search, car finder, buy car, sell car, car price, car comparison, india",
  authors: [{ name: "Suzuki" }],
  openGraph: {
    title: "Suzuki - Find Your Perfect Car",
    description:
      "Suzuki is your trusted destination for finding the perfect car. Browse through our extensive collection of new and used cars.",
    type: "website",
    locale: "en_IN",
    siteName: "Suzuki",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suzuki - Find Your Perfect Car",
    description:
      "Suzuki is your trusted destination for finding the perfect car. Browse through our extensive collection of new and used cars.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootStyleRegistry>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <Box sx={{ flexGrow: 1 }}>{children}</Box>
            <Footer />
          </Box>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
