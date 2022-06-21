import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Navbar() {
  return (
    <Toolbar>
      <Typography
        variant="h6"
        color="#ffffff"
        component="div"
        pl={10}
        pt={3}
        pb={3}
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
        Music.Metric
      </Typography>
    </Toolbar>
  );
}

export default Navbar;