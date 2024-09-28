import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

const Delete = () => {
  const handleDelete = () => {
    // Add delete logic here
    console.log('Profile deleted');
  };

  const handleCancel = () => {
    // Add cancel logic (e.g., navigate away)
    console.log('Delete canceled');
  };

  return (
    <Box
      sx={{
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        Are you sure you want to delete your profile?
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            fullWidth
            onClick={handleCancel}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            fullWidth
            onClick={handleDelete}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Delete;
