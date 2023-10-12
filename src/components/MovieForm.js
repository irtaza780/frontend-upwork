import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import { createMovie } from './api';
import { Button, Grid } from '@mui/material';

function MovieForm() {
  const [movie, setMovie] = useState({
    name: '',
    duration: '',
    rating: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie)
      .then((response) => {
        console.log('Movie added:', response.data);
        // Clear the form or update the movie list
      })
      .catch((error) => {
        console.error('Error adding a movie:', error);
      });
  };

  return (
    <Grid container>
      <Grid md={6}>
        <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
          <TextField
            sx={{ margin: '10px' }}
            fullWidth
            label='Movie Name'
            variant='outlined'
            type='text'
            placeholder='Movie Name'
            value={movie.name}
            onChange={(e) => setMovie({ ...movie, name: e.target.value })}
          />
          <TextField
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
          />
          <br />
          <Button variant='contained' type='submit'>
            Add Movie
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default MovieForm;
