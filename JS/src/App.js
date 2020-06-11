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
      calculated: "",
      isTyping: false,
      isStarted: false,
      isLoaded: false,
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendComand();
    this.bot(this.state.currentMessage.trim());
  }

  handleMessageChange(e) {
    this.setState({ currentMessage: e.target.value, isTyping: true });
    let timerId = setTimeout(() => this.setState({ isTyping: false }), 1000);
    clearTimeout(timerId - 1);
  }

  wrongCommand() {
    this.sendResponse("Я не понимаю, введите другую команду! Чтобы увидеть доступные комманды, введите /commands");
  }

  sendComand() {
    this.setState((state) => {
      return {
        messages: [
          {
            message: state.currentMessage,
            owner: "user"
          },
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
      if (message === "/stop") {
        this.setState({
          isStarted: false,
          calculated: ""
        })
        this.sendResponse("Всего доброго, если хочешь поговорить пиши /start")
      } else if (!this.state.calculated) {
        let command;
        let commandEnd
        if (message.indexOf(":") > 0) {
          commandEnd = message.indexOf(":") + 1;
          console.log(message.indexOf(":"))
          //или если нет : то вся строка.
          command = message.slice(0, commandEnd);
        } else {
          command = message;
          commandEnd = message.length;
        }
        console.log(command)
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
          case "/number:":
            let a = message.slice(commandEnd, message.indexOf(","));
            let b = message.slice(message.indexOf(",") + 1);
            if (isNaN(a) || isNaN(b)) {
              this.wrongCommand();
            }
            else {
              this.sendResponse(
                `Введите одно из действий: -, +, *, /`
              );
              this.setState({
                calculated: a + "," + b,
              })
            }
            break;
          case "/weather":
            this.setState((state) => {
              return {
                isLoaded: true
              };
            });
            fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=moscow&lang=ru&cnt=11", {
              "method": "GET",
              "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "581b3afbafmsh99252ed58830336p1dd2f0jsn43c3580d1e39"
              }
            })
              .then(response => response.json())
              .then(result => {
                const weather = `Погода на завтра:
                    ${Math.round(result['list'][10]['main']['temp'] - 273)}°C, ${result['list'][10]['weather'][0]['description']}
                      Скорость ветра: ${Math.round(result['list'][10]['wind']['speed'])} м/c`
                this.sendResponse(weather);
                this.setState((state) => {
                  return {
                    isLoaded: false
                  };
                });
              }

              )

              .catch(err => {
                console.log(err);
                this.sendResponse('Сейчас не удается узнать прогноз, попробуйте позже');
                this.setState((state) => {
                  return {
                    isLoaded: false
                  };
                });
              });
            break;
          case "/commands":
            this.sendResponse(`Доступные комманды:
            /name: "Ваше имя"
            /number: "Число1", "Число2" 
            /weather
            /stop`);
            break;
          default:
            this.wrongCommand();
        }

      }
      else {
        let a = +this.state.calculated.slice(0, this.state.calculated.indexOf(","));
        let b = +this.state.calculated.slice(this.state.calculated.indexOf(",") + 1);
        let result;
        switch (message) {
          case "+": result = a + b;
            break;
          case "-": result = a - b;
            break
          case "*": result = a * b;
            break
          case "/": result = a / b;
            break
          default: this.sendResponse(
            `Введите одно из действий: -, +, *, /`
          );
            return;
        }
        this.sendResponse(
          `${a} ${message} ${b} = ${result}`
        );
        this.setState({
          calculated: "",
        })
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
            ) : ("")}
            {this.state.isLoaded ? (
              <Message by="bot" text={<TypingText />} />
            ) : ("")}
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
