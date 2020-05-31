function greetingSubmit(event) {
  if (!input.value) return;
  greeting.textContent = `Hi, ${input.value}!`;
  event.preventDefault();
  form.style.borderColor="rgb(15, 76, 129)";
  container.style.backgroundColor="rgb(188, 178, 162)";
}

const container = document.querySelector("div.container");
const form = document.getElementById("form");
const input = document.getElementById("input");
const greeting = document.getElementById("greeting");
const button = document.querySelector("button.form__button");
form.addEventListener("submit", greetingSubmit);
