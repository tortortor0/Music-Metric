import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Login() {
  const getLogin = () => {
    fetch('/api/login')
      .then(res => res.json())
      .then(res => window.location.href = res);
  }

  return(
    <div className="main-wrapper" style={{backgroundImage: `linear-gradient(#6EDBC4, #F4EFC2)`}}>
      <Grid
        container spacing={0}
        align='center'
        justifyContent='center'
        direction='column'
        style={{ minHeight: '100vh' }}>
        <Grid item>
          <Typography
            variant='h3'
            pb={3}>
            Music.Metric
          </Typography>
          <Button
            className='login-button'
            disableElevation
            variant='contained'
            sx={{ 
              borderRadius: 28,
              '&:hover': {
                bgcolor: '#F230AA',
                color: 'white',
              } 
            }}
            color='primary'
            onClick={getLogin}>
                Login with Spotify
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login;