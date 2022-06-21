import React, {useEffect, useState} from 'react';
import 'regenerator-runtime/runtime';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

function Graph({ playlistData }) {
  const [metric, setMetric] = useState('energy');
  const [data, setData] = useState({});
  const playlistName = playlistData.playlistName;
  console.log('playlistData', playlistData)

  const handleChange = (e) => {
    setMetric(e.target.value);
  }

  useEffect(() => {
    if(!playlistData) return;
    const dataObj = {
      labels: playlistData.trackList,
      datasets: [
        {
          label: metric,
          data: playlistData[metric],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    };    
    setData(dataObj);
    console.log(dataObj)
  }, [metric, playlistData])

  const divStyle = {
    color: '#34594E',
    fontWeight: 'bold',
  };

  return (
    <Box sm={{ minWidth: 300 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel>SELECT METRIC</InputLabel>
          <Select
            style={divStyle}
            label='SELECT METRIC'
            value={ metric }
            onChange={ handleChange }>
            <MenuItem value={ 'energy' }>Energy</MenuItem>
            <MenuItem value={ 'danceability' }>Danceability</MenuItem>
            <MenuItem value={ 'key' }>Key</MenuItem>
            <MenuItem value={ 'tempo' }>Tempo</MenuItem>
            <MenuItem value={ 'loudness' }>Loudness</MenuItem>
            <MenuItem value={ 'valence' }>Valence</MenuItem>
          </Select>
        </FormControl>
        { playlistName && <Box
          bgcolor='#CCF656'>
          <Typography
            p={1}
            variant="h5"
            color='#48937E'>
            { playlistName }
          </Typography>
        </Box>}
      </Box>
      {Object.keys(data).length && <Line data={ data } />}
    </Box>
  );
}

export default Graph;