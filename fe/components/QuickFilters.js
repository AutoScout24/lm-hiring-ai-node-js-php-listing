"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, Card, Divider } from "@mui/material";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";

export default function QuickFilters() {
  const router = useRouter();

  const handleFilterClick = (filter) => {
    router.push(`/?${filter}`);
  };

  const filters = [
    {
      name: "New Cars",
      value: "category=new",
      icon: <TimeToLeaveIcon />,
    },
    {
      name: "Used Cars",
      value: "category=used",
      icon: <TimeToLeaveIcon />,
    },
    {
      name: "Under 10 Lakh",
      value: "maxPrice=1000000",
      icon: <CurrencyRupeeIcon />,
    },
    {
      name: "SUV Cars",
      value: "type=SUV",
      icon: <AirportShuttleIcon />,
    },
    {
      name: "Sedan Cars",
      value: "type=Sedan",
      icon: <LocalTaxiIcon />,
    },
    {
      name: "Electric Cars",
      value: "fuelType=Electric",
      icon: <ElectricCarIcon />,
    },
  ];

  return (
    <Box sx={{ mb: 4, overflow: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          pb: 1,
        }}
      >
        {filters.map((filter, index) => (
          <Card
            key={index}
            onClick={() => handleFilterClick(filter.value)}
            sx={{
              minWidth: 140,
              cursor: "pointer",
              textAlign: "center",
              p: 1.5,
              borderRadius: 2,
              transition: "all 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
          >
            <Box sx={{ color: "primary.main" }}>{filter.icon}</Box>
            <Typography variant="body2" fontWeight="medium" sx={{ mt: 1 }}>
              {filter.name}
            </Typography>
          </Card>
        ))}
      </Box>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
}
