import React, { Component } from "react";
import Message from "./components/Message";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    message: "",

    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <main className="app">
        <h1 className="app__title">Чат-бот</h1>
        <section className="app__content">
          <div className="chat-wrapper">
            <Message by="bot" text="KEKUS" />
          </div>
          <form
            onSubmit={this.handleSubmit}
            className="form-wrapper" /*>method="post"*/
          >
            <input
              type="text"
              className="input-text"
              value={this.state.message}
              onChange={this.handleMessageChange}
              placeholder="Message"
            />
            <input type="submit" value="" className="submit" />
          </form>
        </section>
      </main>
    );
  }
}

export default App;
