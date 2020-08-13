import React, { Component } from 'react';
import UserPage from './userPage.js';
import PartyPage from './partyPage.js';
import QueueEntry from './queueEntry.js';
// import exampleVideoData from '../fakeData.js';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { YOUTUBE_API_KEY, OAUTH_CLIENT_ID } from '../config.js';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import $ from 'jquery';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      video: {},
      hostPartyClicked: false,
      loginComplete: false,
      currentUser: '',
      currentId: '',
      userPlaylist: [],
      redirect: false,
      code: '',
      nextVideo: {},
    };
    this.clickHostParty = this.clickHostParty.bind(this);
    this.dropHostParty = this.dropHostParty.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.toggleHost = this.toggleHost.bind(this);
    this.listClickHandler = this.listClickHandler.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.makeID = this.makeID.bind(this);
  }

  componentDidMount() {
    $('#player').toggle();
  }
  // Authorization: login

  handleFormChange(event) {
    return this.setState({
      code: event.target.value,
    });
  }

  makeID() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  clickHostParty() {
    $('#player').toggle();
    player.playVideo();
    this.setState({
      hostPartyClicked: !this.hostPartyClicked,
    });
    this.toggleHost();
  }

  dropHostParty() {
    this.setState({
      hostPartyClicked: false,
    });
    return (
      <BrowserRouter>
        <Route to="/"></Route>
      </BrowserRouter>
    );
  }

  toggleHost() {
    const { currentUser, hostPartyClicked } = this.state;
    console.log('Here is the ID:', this.makeID());
    if (!hostPartyClicked) {
      axios.post('http://localhost:3000/host', {
        host: true,
        firstName: currentUser,
      });
    } else {
      this.setState({
        hostPartyClicked: false,
      });
      axios.post('http://localhost:3000/host', {
        host: false,
        firstName: currentUser,
      });
    }
  }

  responseGoogle(response) {
      console.log(response.details)
    axios
      .post('http://localhost:3000/login', {
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        host: false,
        email: response.profileObj.email,
      })
      .then(({ data }) => {
        let userPlaylist = [];
        let video = {};
        if (data.songs) {
          userPlaylist = data.songs.map((song) => {
            return {
              snippet: {
                thumbnails: { default: { url: song.thumbnail } },
                title: song.title,
                channelTitle: song.artist,
              },
              id: { videoId: song.url },
            };
          });
        }
        console.log('axios response user ID', data);
        this.setState({
          loginComplete: !this.loginComplete,
          currentUser: response.profileObj.givenName,
          currentId: data.user.id,
          userPlaylist,
          video: userPlaylist[0] || video,
        });
        // console.log(response, 'profile obj:', response.profileObj);
      });
  }

  // YouTube Search Helper Function
  searchHandler(e) {
    const { searchTerm } = this.state;
    if (e === 'click' && searchTerm.length) {
      console.log('searched', searchTerm);
      axios
        .get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: YOUTUBE_API_KEY,
            q: searchTerm,
            maxResults: 5,
            type: 'video',
            videoEmbeddable: true,
            part: 'snippet',
          },
        })
        .then(({ data }) => {
          console.log(data.items);
          this.setState({
            videos: data.items,
            // video: data.items[0],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({
        searchTerm: e.target.value,
      });
    }
  }
  // Handles Clicks on YouTube Search Results
  listClickHandler(video) {
    const { hostPartyClicked, currentId, userPlaylist } = this.state;
    console.log('clicked list item', video);

    if (hostPartyClicked) {
      this.setState({ video });
      player.loadVideoById(video.id.videoId);
      // player.stopVideo();
    } else {
      axios
        .post(`http://localhost:3000/playlist/${currentId}`, {
          url: video.id.videoId,
          title: video.snippet.title,
          artist: video.snippet.channelTitle,
          thumbnail: video.snippet.thumbnails.default.url,
        })
        .then(({ data }) => {
          if (data === false) {
            // If song doesn't already exist in database
            this.setState({
              userPlaylist: userPlaylist.concat([video]),
              video: userPlaylist[0],
            });
            player.loadVideoById(this.state.video.id.videoId);
            player.stopVideo();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  // sortPlaylist() {
  //   const { userPlaylist } = this.state;

  //   const compare = (a, b) => {
  //     if (a is less than b by some ordering criterion) {
  //       return -1;
  //     }
  //     if (a is greater than b by the ordering criterion) {
  //       return 1;
  //     }
  //     // a must be equal to b
  //     return 0;
  //   }
  //   this.setState({
  //     userPlaylist: userPlaylist.sort()
  //   })
  // }

  render() {
    const {
      videos,
      hostPartyClicked,
      video,
      loginComplete,
      userPlaylist,
      code,
    } = this.state;

    if (hostPartyClicked) {
      return (
        <PartyPage
          video={video}
          userPlaylist={userPlaylist}
          hostPartyClicked={hostPartyClicked}
          dropHostParty={this.dropHostParty}
          listClickHandler={this.listClickHandler}
          toggleHost={this.toggleHost}
          voteUpdate={this.voteUpdate}
        />
      );
    }
    if (!loginComplete) {
      return (
        <GoogleLogin
          clientId={OAUTH_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      );
    }

    return (
      <div>
        <BrowserRouter>
          <Link to={`/${this.makeID()}`}>
            <button>GENERATE ACCESS CODE</button>
          </Link>
        </BrowserRouter>

        <UserPage
          clickHostParty={this.clickHostParty}
          videos={videos}
          searchHandler={this.searchHandler}
          listClickHandler={this.listClickHandler}
          userPlaylist={userPlaylist}
          handleFormChange={this.handleFormChange}
          code={code}
        />
      </div>
      // User component:
      // Playlist component
      // button: HOST PARTY
      // input: ACCESS CODE
      // Search component

      // Party component:
      // VideoPlayer component
      // Queue component (include votes)
    );
  }
}

export default App;
