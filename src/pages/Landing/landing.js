import React, { useEffect, useState } from "react";
import MovieForm from "../../components/MovieForm";
import MovieList from "../../components/MovieList";
import SearchBar from "../../components/SearchBar";
import { Container } from "@mui/material";
import {
  getAllMovies,
  searchMovies,
  deleteMovie,
} from "../../actions/apiActions";
const Landing = () => {
  const [movie, setMovie] = useState({
    id: 0,
    name: "",
    duration: "",
    rating: 0.0,
  });

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  //filter

  const [ratingSort, setRatingSort] = useState("DESC");

  const handleChangeRatingSort = (value) => {
    console.log("value of sort is ", value);
    setRatingSort(value);
  };

  //movies
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState("");

  //movies object
  const handleChangeMovie = (movieObj) => {
    setMovie(movieObj);
  };

  //add or edit
  const handleChangeIsEdit = (value) => {
    setIsEdit(value);
  };

  //loading change
  const handleChangeLoading = (value) => {
    setLoading(value);
  };

  //search change
  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // searched movies data
  const handleChangeSearchedMovies = (movies) => {
    console.log("movies changed", movies);
    setSearchedMovies(movies);
  };

  //page
  const handleChangePage = (newPage) => {
    setPage(newPage + 1);
  };

  // rows per page
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value));
    setPage(1);
  };

  //refetch movies data
  const refetchMovies = async () => {
    let moviesData = [];
    if (searchTerm) {
      moviesData = await searchMovies(page, rowsPerPage, searchTerm);
    } else {
      moviesData = await getAllMovies(page, rowsPerPage, ratingSort);
    }
    setMovies(moviesData?.data?.paginatedResponse?.movies);
    setTotalCount(moviesData?.data?.paginatedResponse?.totalCount);
  };
  useEffect(() => {
    console.log("page os ", page);
  }, [page]);

  //side effects for data
  useEffect(() => {
    let moviesData = [];
    const fetchMovies = async () => {
      if (searchTerm) {
        moviesData = await searchMovies(page, rowsPerPage, searchTerm);
      } else {
        moviesData = await getAllMovies(page, rowsPerPage, ratingSort);
      }

      setMovies(moviesData?.data?.paginatedResponse?.movies);
      setTotalCount(moviesData?.data?.paginatedResponse?.totalCount);
    };

    fetchMovies();
  }, [searchTerm, searchedMovies, page, rowsPerPage, ratingSort]);

  return (
    <>
      <Container>
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearchChange}
          setSearchedMovies={handleChangeSearchedMovies}
          page={page}
          rowsPerPage={rowsPerPage}
          setLoading={handleChangeLoading}
        />
        <MovieForm
          refetchMovies={refetchMovies}
          isEdit={isEdit}
          movie={movie}
          setMovie={handleChangeMovie}
          setIsEdit={handleChangeIsEdit}
        />
        <MovieList
          movies={movies}
          movie={movie}
          setMovie={handleChangeMovie}
          searchTerm={searchTerm}
          searchedMovies={searchedMovies}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={handleChangePage}
          setRowsPerPage={handleChangeRowsPerPage}
          loading={loading}
          setLoading={handleChangeLoading}
          refetchMovies={refetchMovies}
          isEdit={isEdit}
          setIsEdit={handleChangeIsEdit}
          totalCount={totalCount}
          ratingSort={ratingSort}
          setRatingSort={handleChangeRatingSort}
        />
      </Container>
    </>
  );
};

export default Landing;
