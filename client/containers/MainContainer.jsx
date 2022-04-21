import React, { Component } from 'react';
import 'regenerator-runtime/runtime';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class MainContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false,
        accessToken: null,
        playlists: [],
        trackList: [],
        energyList: [],
        playlistName: ''
      }
      this.handleClickLogin = this.handleClickLogin.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.handleClickPlaylists = this.handleClickPlaylists.bind(this);
      this.setState = this.setState.bind(this);
      this.handleClickPlaylistsList = this.handleClickPlaylistsList.bind(this);
    }
    
    handleClickLogin() {
      fetch('/login')
      .then(data => {
        return data.url})
      .then(data => {
        console.log(data)
        return window.location.replace(`${data}`);
      })
    }

    handleClickPlaylists() {
      fetch('/playlists')
      .then(data => data.json())
      .then(data => data.playlists)
      .then(data => this.setState(state => {return {playlists: data}}))
      //.then(data => {console.log(this.state.playlists)})
    }

    handleClickPlaylistsList(e, elid) {
      console.log(elid);
      e.stopPropagation();
      fetch('/getplaylist', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: elid})
      })
      .then(data => {
        console.log('reached this point')
        return data.json()
      })
      .then(data => this.setState({energyList: data.trackEnergies, danceList: data.trackDanceability, trackList: data.trackList, playlistName: data.playlistName}))
      .then(data => console.log(this.state))
    }

    componentDidMount() {
      fetch('./loginstatus')
      .then(data => data.json())
      .then(data => {
        if(data.loginStatus === true) {
          this.setState({isLoggedIn: true});
          console.log('User is Logged In')
        }
      });
    }

    render() {
      const data = {
        labels: this.state.trackList,
        datasets: [
          {
            label: "Track Energy",
            data: this.state.energyList,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Track Danceability",
            data: this.state.danceList,
            fill: false,
            borderColor: "#F764AE"
          }
        ]
      };

      if(this.state.isLoggedIn) {
        return(
          <div className="main-content-container">
            <div className="logo-container">
              <p id="music-metric-logo">Music.Metric</p>
            </div>
            <div className="list-of-playlists">
              <p id="my-playlists-header">My Playlists</p>
              <div id="playlists">
                {this.state.playlists.map((el) => (
                  <li className="playlist-element" onClick={(e) => {
                    this.handleClickPlaylistsList(e, el.id)}} key={`playlistitem${el.id}`}>{el.name}</li>
                ))}
              </div>
              <div className="get-playlists-button-container">
                <button className="get-playlists-button" onClick={this.handleClickPlaylists}>Get My Playlists</button>
              </div>
            </div>

            <div className="playlist-energy-graph">
              <p id="graph-name">{this.state.playlistName}</p>
              <Line data={data} />
            </div>
          </div>
        )
      }

      else {
        return(
          <div>
            <div className="main-font-container">
              <p>Music.Metric</p>
            </div>
            <div className="login-button-container" onClick={this.handleClickLogin}>
              <button className="login-button">CONNECT WITH SPOTIFY</button>
            </div>
          </div>
        );
      }
    }
  }

  export default MainContainer;