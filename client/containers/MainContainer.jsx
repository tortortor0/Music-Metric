import React, {useState} from 'react';
import Navbar from '../components/Navbar.jsx';
import PlaylistsContainer from './PlaylistsContainer.jsx';
import Grid from '@mui/material/Grid'

function MainContainer() {
  return (
    <div
      class = "main-wrapper"
      style={{backgroundImage: `linear-gradient(#6EDBC4, #F4EFC2)`}}>
      <Navbar />
      <PlaylistsContainer />
    </div>
  )
}

export default MainContainer;