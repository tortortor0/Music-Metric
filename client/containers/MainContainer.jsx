import React, { Component } from 'react';
import 'regenerator-runtime/runtime';

class MainContainer extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick = async(e) => {
      console.log('in handleClick')
      console.log(e);
      try {
        const data = await fetch.get('/login');
        return data;
      } catch(err) {
        return err;
      }
    }

    render() {
      return(
        <div>
          <div className="main-font-container">
            <p>Music.Metric</p>
          </div>
          <div className="button-container" onClick={this.handleClick}>
            <button className="sign-up-button" onClick={this.handleClick}>CONNECT WITH SPOTIFY</button>
          </div>
        </div>
      );
    }
  }

  export default MainContainer;