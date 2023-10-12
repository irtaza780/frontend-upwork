import React from 'react';
import Papa from 'papaparse';
import { Button } from '@mui/material';
import helper_functions from '../config/helperFunctions';

function DownloadCSV({ movieData }) {

    const handleDownload = () => helper_functions.handleDownloadCSV(Papa, movieData)

    return (
        <div>
            <Button variant='outlined' onClick={handleDownload}>
                Download
            </Button>
        </div>
    );
}

export default DownloadCSV;
