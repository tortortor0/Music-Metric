import React, { Component } from "react";
import MainContainer from "./containers/MainContainer.jsx";
import "./styles.css"

class Main extends Component {
   constructor(props) {
     super(props);
   }
 
   render() {
     return(
       <div className='page'>
          <p>Main.jsx is here</p>
       </div>
     );
   }
 }
 
export default Main;