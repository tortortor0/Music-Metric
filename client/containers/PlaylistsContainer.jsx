import React, {useEffect, useState} from 'react';
import Graph from '../components/Graph.jsx';
import Playlists from '../components/Playlists.jsx';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

function PlaylistsContainer() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistID, setPlaylistID] = useState('');
  const [playlistData, setPlaylistData] = useState({});

  useEffect(() => {
    fetch('/api/playlists')
      .then(res => res.json())
      .then(res => setPlaylists(res))
  }, []);

  useEffect(() => {
    if(!playlistID.length) return;
    fetch('/api/getplaylist', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: playlistID})
    })
      .then(data => data.json())
      .then(data => setPlaylistData(data))
  }, [playlistID])

  return (
    <Box ml={13} pr={10} pt={3}>
      <Grid container spacing={20}>
        <Grid item sm={3}>
          <Typography
            variant="h5"
            color="#F230AA"
            pb={2}>
              MY PLAYLISTS
          </Typography>
          <Playlists playlists={ playlists } setPlaylistID={ setPlaylistID } />
        </Grid>
        <Grid item sm={8}>
          <Graph playlistData={ playlistData } />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PlaylistsContainer;