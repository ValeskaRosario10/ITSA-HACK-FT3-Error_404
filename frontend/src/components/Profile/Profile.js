import { BrowserRouter } from 'react-router-dom';
// import Profile from './Profile';
import React from 'react';
import { Box, Button, TextField, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
  return (
    
      <div>
      
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { margin: '10px', width: '100%' },
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            variant="outlined"
            defaultValue="adsd"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            variant="outlined"
            defaultValue="dsds"
          />
        </Grid>
      </Grid>
      <TextField
        label="Email address"
        variant="outlined"
        fullWidth
        defaultValue="23daws@gmail.com"
      />
    
    </Box>


      </div>
    
  );
}

export default Profile;