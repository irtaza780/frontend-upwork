const helper_functions = {

    handleDownloadCSV(Papa, movieData) {
        const csvData = Papa.unparse(movieData);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'movie_data.csv';
        a.click();
        URL.revokeObjectURL(url);
    },

}

export default helper_functions;