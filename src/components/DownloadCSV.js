import React from 'react';
import Papa from 'papaparse';
import { Button } from '@mui/material';

function DownloadCSV({ movieData }) {
  const handleDownloadCSV = () => {
    const csvData = Papa.unparse(movieData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movie_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleDownloadCSV}>
        Download
      </Button>
    </div>
  );
}

export default DownloadCSV;
