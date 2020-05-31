const square = document.querySelector(".square");
const container = document.querySelector(".container");
const content = document.querySelector(".content");

square.onanimationend = () => {
  content.style.borderColor = "rgb(15, 76, 129)";
  container.style.backgroundColor = "rgb(188, 178, 162)";
};
