import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Button,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DownloadCSV from "./DownloadCSV";
import { getAllMovies, deleteMovie } from "../actions/apiActions";

const MovieList = ({
  searchTerm,
  searchedMovies,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  loading,
  setLoading,
  movies,
  refetchMovies,
  isEdit,
  setIsEdit,
  movie,
  setMovie,
  totalCount,
  ratingSort,
  setRatingSort,
}) => {
  const [sortConfig, setSortConfig] = useState({
    field: "",
    direction: "",
  });

  const handleEdit = (data) => {
    if (movie === data) {
      setIsEdit(false);
      setMovie({ id: 0, name: "", duration: "", rating: 0.0 });
    } else if (movie !== data) {
      setIsEdit(true);
      setMovie(data);
    }

    // if (isEdit) {
    // } else {
    // }
  };

  // useEffect(() => {
  //   console.log("page is ", page);
  //   console.log("search movies 1", searchedMovies);

  //   if (searchedMovies.data && searchTerm) {
  //     setMovies(searchedMovies.data.paginatedResponse.movies);
  //     setTotalCount(searchedMovies.data.paginatedResponse.totalCount);
  //   } else {
  //     getAllMovies(page, rowsPerPage)
  //       .then((response) => {
  //         console.log("data is ", response);
  //         setMovies(response.data.paginatedResponse.movies);
  //         setTotalCount(response.data.paginatedResponse.totalCount);
  //       })
  //       .catch((error) => {
  //         console.log("Error", error);
  //         // alert("ERROR", error)
  //       });
  //   }
  // }, [searchTerm, searchedMovies, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    console.log("new page is ", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleSort = (field) => {
    console.log("field", sortConfig.direction);
    setSortConfig({
      field,
      direction:
        sortConfig.field === field && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
    setRatingSort(sortConfig.direction === "asc" ? "ASC" : "DESC");
  };

  const handleDeleteMovie = async (movieId) => {
    await deleteMovie(movieId);
    await refetchMovies();
  };

  return (
    <>
      <Grid container>
        <Grid md={6}>
          <DownloadCSV movieData={movies} />{" "}
        </Grid>
      </Grid>

      {/* Add the download button component */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig?.field === "name"}
                  direction={
                    sortConfig?.field === "name" ? sortConfig?.direction : "asc"
                  }
                  onClick={() => handleSort("name")}
                >
                  Movie Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === "duration"}
                  direction={
                    sortConfig.field === "duration"
                      ? sortConfig.direction
                      : "asc"
                  }
                  onClick={() => handleSort("duration")}
                >
                  Duration
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === "rating"}
                  direction={
                    sortConfig.field === "rating" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSort("rating")}
                >
                  Rating
                </TableSortLabel>
              </TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <TableBody>
              {movies && movies.length > 0 ? (
                movies.map((movieData) => (
                  <TableRow key={movieData.id}>
                    <TableCell>{movieData.name}</TableCell>
                    <TableCell>{movieData.duration}</TableCell>
                    <TableCell>{movieData.rating}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(movieData)}>
                        {movie !== movieData ? "Edit" : "Add"}
                      </Button>
                      <Button onClick={() => handleDeleteMovie(movieData.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No movies found</TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* <Grid
        sx={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}
      >
        <Pagination
          count={totalCount}
          page={page}
          onChange={handleChangePage}
        />
      </Grid> */}
    </>
  );
};

export default MovieList;
