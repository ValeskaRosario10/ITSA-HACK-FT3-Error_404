import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import CancelIcon from '@mui/icons-material/Cancel';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation for example purpose
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match!');
    } else {
      setError('');
      // Handle password change logic
      console.log('Password changed successfully');
    }
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
      }}
    >
    
      <form onSubmit={handleSubmit}>
        <TextField
          label="Current Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: <LockIcon color="action" sx={{ marginRight: '8px' }} />,
          }}
        />
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: <LockIcon color="action" sx={{ marginRight: '8px' }} />,
          }}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: <LockIcon color="action" sx={{ marginRight: '8px' }} />,
          }}
        />

        {error && (
          <Typography color="error" sx={{ marginTop: '10px' }}>
            {error}
          </Typography>
        )}

        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '20px' }}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              fullWidth
              onClick={() => console.log('Canceled')}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<CheckCircleIcon />}
              fullWidth
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ChangePassword;
