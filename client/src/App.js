import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:9000/api/posts").then(response => {
      console.log(response.data);
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.users} {this.state.posts}
      </div>
    );
  }
}

export default App;
