import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { searchMovies } from "../actions/apiActions";

function SearchBar({
  searchTerm,
  onSearch,
  setSearchedMovies,
  page,
  rowsPerPage,
  setLoading,
}) {
  const [debouncedValue, setDebouncedValue] = useState("");

  const handleSearchChange = async (e) => {
    const { value } = e.target;
    onSearch(value);

    if (debouncedValue) {
      clearTimeout(debouncedValue);
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      setDebouncedValue(value);

      console.log("Sending API request for:", value);
      const res = await searchMovies(page, rowsPerPage, searchTerm);
      setSearchedMovies(res);
      console.log("res is ", res);
      setLoading(false);
    }, 1000);

    setDebouncedValue(timer);
  };

  return (
    <Paper sx={{ width: "30rem", margin: "auto", marginTop: "0.625rem" }}>
      <TextField
        fullWidth
        type="text"
        placeholder="Search Movies"
        value={searchTerm}
        onChange={(e) => handleSearchChange(e)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LiveTvIcon />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
}

export default SearchBar;
