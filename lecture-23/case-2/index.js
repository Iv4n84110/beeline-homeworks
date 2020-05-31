const source = document.querySelector("div.source");

source.addEventListener("copy", (event) => {
  const newText = document.createElement("span");
  const elem = document.getElementsByClassName("source")[0];
  const str = elem.innerText;
  const symbols = str.split("");

  let k = 1;

  symbols.forEach(function (item, i) {
    let span = document.createElement("span");
    if (i % 2 == 0) item = item.toString().toUpperCase();
    switch (k) {
      case 1:
        span.style.backgroundColor = "rgb(255, 0, 0)";
        break;
      case 3:
        span.style.backgroundColor = "rgb(0,255,0)";
        break;
      case 2:
        span.style.backgroundColor = "rgb(255,255,0)";
        break;
      case 4:
        span.style.backgroundColor = "rgb(0,255,255)";
        break;
      case 5:
        span.style.backgroundColor = "rgb(0,0,255)";
        break;
      case 6:
        span.style.backgroundColor = "rgb(255,0,255)";
        k = 0;
        break;
    }
    k++;
    span.innerHTML = item;
    newText.appendChild(span);
  });
  event.clipboardData.setData("text/html", newText.innerHTML);

  event.preventDefault();
});
