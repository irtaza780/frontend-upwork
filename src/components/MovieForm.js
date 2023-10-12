import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import { createMovie, updateMovie } from "../actions/apiActions";
import { Box, Button, Grid, Typography } from "@mui/material";

const MovieForm = ({ movie, setMovie, refetchMovies, isEdit, setIsEdit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      const { id, ...rest } = movie;
      updateMovie(id, rest)
        .then((response) => {
          console.log("Movie added:", response.data);
          // Clear the form or update the movie list
          setMovie({ name: "", duration: "", rating: 0.0 });
          setIsEdit(false)
        })
        .then(() => {
          refetchMovies();
        })
        .catch((error) => {
          console.error("Error adding a movie:", error);
        });
    } else if (!isEdit) {
      createMovie(movie)
        .then((response) => {
          console.log("Movie added:", response.data);
          // Clear the form or update the movie list
          setMovie({ name: "", duration: "", rating: 0.0 });
        })
        .then(() => {
          refetchMovies();
        })
        .catch((error) => {
          console.error("Error adding a movie:", error);
        });
    }
  };

  const [durationError, setDurationError] = useState(false);

  const handleDurationError = () => {
    const value = movie.duration;
    console.log("value is ", value, typeof value);
    // const isRegex = /^(((720|[1-9][0-9]{0,2})m)|((12|0?\.[1-9])h))$/.test(
    //   value.toString()
    // );

    // const isRegex = /^(((720|[1-6]?[0-9]{1,2})m)|((12|0?\.[1-9])h))$/.test(value.toString());
    let isXm = /^([1-9]|[1-9][0-9]|720)m$/.test(value.toString());
    let isXh = /^(0\.[1-9]|[1-9]|1[0-2])h$/.test(value.toString());

    if (isXm) {
      isXh = true;
    }
    if (isXh) {
      isXm = true;
    }
    console.log(isXm, isXh);

    if (isXm || isXh) {
      setDurationError(true);
    } else {
      setDurationError(false);
    }
  };

  useEffect(() => {
    handleDurationError();
  }, [movie.duration]);

  return (
    <Grid container>
      <Grid md={6}>
        <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  // sx={{ width: '50%', alignSelf: 'center' }}
                >
                  Movie Name
                </Typography>

                <TextField
                  sx={{ margin: "10px" }}
                  fullWidth
                  label="Movie Name"
                  variant="outlined"
                  type="text"
                  placeholder="Movie Name"
                  value={movie.name}
                  onChange={(e) => setMovie({ ...movie, name: e.target.value })}
                />
              </Box>
              <Box display="flex" justifyContent="start">
                <Typography variant="h5" sx={{ alignSelf: "center" }}>
                  Duration
                </Typography>
                <TextField
                  sx={{ margin: "10px" }}
                  label="Duration (Hours: 0.1h-12h or Minutes: 1m-720m)"
                  variant="outlined"
                  type="text"
                  placeholder="Duration (e.g., 2.5h or 120m)"
                  value={movie.duration}
                  error={!durationError}
                  helperText={
                    !durationError && "Duration must 0.1h-12h or 1m-720m)"
                  }
                  onChange={(e) => {
                    setMovie({ ...movie, duration: e.target.value });
                  }}
                />
              </Box>

              <Box display="flex" justifyContent="start">
                <Typography variant="h5" sx={{ alignSelf: "center" }}>
                  Rating
                </Typography>
                <TextField
                  sx={{ margin: "10px" }}
                  label="Enter a rating between 0 and 10"
                  variant="outlined"
                  type="number"
                  placeholder="Required "
                  value={movie.rating}
                  onChange={(e) =>
                    setMovie({ ...movie, rating: e.target.value })
                  }
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 10,
                      step: 0.1,
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="center"></Box>
            </Grid>
          </Grid>
          {/* <TextField
            sx={{ margin: '10px' }}
            label='Duration (e.g., 2.5h or 120m)'
            variant='outlined'
            type='text'
            placeholder='Duration (e.g., 2.5h or 120m)'
            value={movie.duration}
            onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
          />
          <TextField
            sx={{ margin: '10px' }}
            label='Rating (0-10)'
            variant='outlined'
            type='number'
            placeholder='Rating (0-10)'
            value={movie.rating}
            onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
          /> */}
          <br />
          <Button
            variant="contained"
            type="submit"
            style={{ textTransform: "capitalize" }}
          >
            {isEdit ? "Edit" : "Add"} Movie
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default MovieForm;
