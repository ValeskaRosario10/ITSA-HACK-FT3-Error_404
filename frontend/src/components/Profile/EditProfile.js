import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = () => {
    // Add profile update logic here
    console.log('Profile updated:', { firstName, lastName, email });
  };

  const handleCancel = () => {
    // Add cancel logic (e.g., navigate away)
    console.log('Update canceled');
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '20px' }}>
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
              color="primary"
              startIcon={<EditIcon />}
              fullWidth
              onClick={handleUpdate}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditProfile;
