import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

function Playlists({ playlists, setPlaylistID }) {

  return (
    <div id="playlists">

      {playlists.map((el) => (
        <Typography 
          variant='h4'
          pb={1}
          mr={2}
          onClick={() => {setPlaylistID(el.id)}}>
          {el.name}
        </Typography>
      ))}
    </div>
  );
}

export default Playlists;