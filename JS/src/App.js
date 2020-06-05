import React, { Component } from "react";
import Message from "./components/Message";
import TypingText from "./components/TypingText";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: "",
      isTyping: false,
      isStarted: false,
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.bot(this.state.currentMessage);
    this.setState({ currentMessage: "", isTyping: false });
  }

  handleMessageChange(e) {
    this.setState({ currentMessage: e.target.value, isTyping: true });
    let timerId = setTimeout(() => this.setState({ isTyping: false }), 1000);
    clearTimeout(timerId - 1);
  }

  wrongCommand() {
    this.setState({
      messages: [
        {
          message: "Я не понимаю, введите другую команду!",
          owner: "bot",
        },
        { message: this.state.currentMessage, owner: "user" },
        ...this.state.messages,
      ],
    });
  }

  bot(message) {
    if (!this.state.isStarted) {
      if (message === "/start") {
        this.setState({
          messages: [
            {
              message: "Привет, меня зовут Чат-бот, а как зовут тебя?",
              owner: "bot",
            },
            { message: this.state.currentMessage, owner: "user" },
            ...this.state.messages,
          ],
          isStarted: true,
        });
      } else {
        this.setState({
          messages: [
            {
              message: "Введите команду /start, для начала общения",
              owner: "bot",
            },
            { message: this.state.currentMessage, owner: "user" },
            ...this.state.messages,
          ],
        });
      }
    } else {
      let commandEnd = message.indexOf(" ");
      let command = message.slice(0, `${commandEnd}`);
      console.log(command);
      switch (command) {
        case "/name:":
          let name = message.slice(commandEnd).trim();
          if (name) {
            this.setState({
              messages: [
                {
                  message: `Привет ${name}, приятно познакомится. Я умею считать, введи числа которые надо посчитать`,
                  owner: "bot",
                },
                { message: this.state.currentMessage, owner: "user" },
                ...this.state.messages,
              ],
            });
          } else {
            this.wrongCommand();
          }
          break;
        default:
          this.wrongCommand();
      }
    }
  }

  render() {
    return (
      <main className="app">
        <h1 className="app__title">Чат-бот</h1>
        <section className="app__content">
          <div className="chat-wrapper">
            {this.state.isTyping ? (
              <Message by="user" text={<TypingText />} />
            ) : (
              ""
            )}
            {this.state.messages.map(({ message, owner }) => (
              <Message by={owner} text={message} />
            ))}
          </div>
          <form onSubmit={this.handleSubmit} className="form-wrapper">
            <input
              type="text"
              className="input-text"
              value={this.state.currentMessage}
              onChange={this.handleMessageChange}
              placeholder="Message"
            />
            <input
              type="submit"
              value=""
              className="submit"
              disabled={!this.state.currentMessage}
            />
          </form>
        </section>
      </main>
    );
  }
}

export default App;
