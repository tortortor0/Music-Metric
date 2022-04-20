import React, { Component } from "react";
import MainContainer from "./containers/MainContainer.jsx";
import "./styles.css"

class App extends Component {
   constructor(props) {
     super(props);
   }
 
   render() {
     return(
       <div className='page'>
          <MainContainer />
       </div>
     );
   }
 }
 
export default App;