"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", md: 600 },
        borderRadius: 50,
        backgroundColor: "white",
        boxShadow: 3,
      }}
    >
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Search Cars or Brands e.g. Swift, or Maruti"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        inputProps={{ "aria-label": "search cars" }}
      />

      <IconButton
        type="submit"
        sx={{ p: "10px", color: "primary.main" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
