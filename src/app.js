import React, { Component } from 'react';

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

    }

    render() {
        return <div>Welcome to fderes!</div>;
    }
}

export default App