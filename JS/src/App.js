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
    this.sendComand();
    this.bot(this.state.currentMessage);
  }

  handleMessageChange(e) {
    this.setState({ currentMessage: e.target.value, isTyping: true });
    let timerId = setTimeout(() => this.setState({ isTyping: false }), 1000);
    clearTimeout(timerId - 1);
  }

  wrongCommand() {
    this.sendResponse("Я не понимаю, введите другую команду!");
  }

  sendComand() {
    this.setState((state) => {
      return {
        messages: [
          { message: state.currentMessage, owner: "user" },
          ...state.messages,
        ],
        currentMessage: "",
        isTyping: false,
      };
    });
  }

  sendResponse(response) {
    this.setState((state) => {
      return {
        messages: [
          {
            message: response,
            owner: "bot",
          },
          ...state.messages,
        ],
      };
    });
  }

  bot(message) {
    if (!this.state.isStarted) {
      if (message === "/start") {
        this.sendResponse("Привет, меня зовут Чат-бот, а как зовут тебя?");
        this.setState({
          isStarted: true,
        });
      } else {
        this.sendResponse("Введите команду /start, для начала общения");
      }
    } else {
      let commandEnd = message.indexOf(" ");
      let command = message.slice(0, `${commandEnd}`);
      console.log(command);
      switch (command) {
        case "/name:":
          let name = message.slice(commandEnd).trim();
          if (name) {
            this.sendResponse(
              `Привет ${name}, приятно познакомится. Я умею считать, введи числа которые надо посчитать`
            );
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
