import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContainer from "./containers/MainContainer.jsx";
import Login from "./components/Login.jsx"
import "./styles.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const [loginState, setLoginState] = useState();

  useEffect(() => {
    fetch('/api/loginstatus')
      .then(res => res.json())
      .then(res => {
        if(res === true) setLoginState(true);
      })
  }, [])

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1DD05E',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#F230AA',
      }
    },
    typography: {
      h3: {
        "fontSize": 100,
        "fontWeight": 600,
        "color": '#ffffff'
      },
      h6: {
        "fontWeight": 600,
        "fontSize": 30,
      },
      h5: {
        "fontWeight": 600,
        "fontSize": 20,
      },
      h4: {
        '&:hover': {
          color: '#fcfcde'
        },
        "fontSize": 20,
        "color": '#48937E'
      },
      fontFamily: [
        'Montserrat',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    }
  });

  if(!loginState) {
    return (
      <ThemeProvider theme={theme}>
        <Login style={{background: `linear-gradient(#6EDBC4, #F4EFC2)`}}/>
      </ThemeProvider>
    )
  }
  return(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainContainer style={{backgroundImage: `linear-gradient(#6EDBC4, #F4EFC2)`}}/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
 
export default App;