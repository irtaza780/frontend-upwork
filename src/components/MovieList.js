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
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DownloadCSV from './downloadCSV';
import { getAllMovies } from '../actions/apiActions';


const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({
    field: '',
    direction: '',
  });

  useEffect(() => {
    getAllMovies().then((data) => {
      setMovies(data.data.movies);
    }).catch((error) => {
      console.log("Error", error)
      // alert("ERROR", error)
    })
  }, []);

  // This function retrieves the list of movies from your API or data source
  const filteredMovies = movies?.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedMovies = [...filteredMovies]?.sort((a, b) => {
    if (!sortConfig?.field) {
      return 0;
    }
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    return direction * (a[sortConfig.field] - b[sortConfig.field]);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field) => {
    setSortConfig({
      field,
      direction:
        sortConfig.field === field && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  return (
    <>
      <Grid container>
        <Grid md={6}>
          
          <TextField
            label='Search'
            type='text'
            placeholder='Search Movies'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid md={6}>
          <DownloadCSV movieData={movies} />{' '}
        </Grid>
      </Grid>

      {/* Add the download button component */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig?.field === 'name'}
                  direction={
                    sortConfig?.field === 'name' ? sortConfig?.direction : 'asc'
                  }
                  onClick={() => handleSort('name')}
                >
                  Movie Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'duration'}
                  direction={
                    sortConfig.field === 'duration'
                      ? sortConfig.direction
                      : 'asc'
                  }
                  onClick={() => handleSort('duration')}
                >
                  Duration
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'rating'}
                  direction={
                    sortConfig.field === 'rating' ? sortConfig.direction : 'asc'
                  }
                  onClick={() => handleSort('rating')}
                >
                  Rating
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovies && filteredMovies.length > 0 ? (
              sortedMovies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell>{movie.name}</TableCell>
                    <TableCell>{movie.duration}</TableCell>
                    <TableCell>{movie.rating}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No movies found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={sortedMovies?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default MovieList;
