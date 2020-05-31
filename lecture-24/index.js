const form = document.querySelector("#form");
const background = document.querySelector(".container");
const red = form.red;
const green = form.green;
const blue = form.blue;

for (const color of document.querySelectorAll(".input__color")) {
  color.max = 255;
  color.value = 255;
}

form.addEventListener("input", () => {
  let color = `rgb(${red.value}, ${green.value}, ${blue.value})`;
  background.style.backgroundColor = color.toString();
  console.log(color);
});
