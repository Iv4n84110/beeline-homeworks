changeBackground = ()=> {
  const container = document.querySelector("div.container");
  const colorA = 300/window.innerHeight*150;
  const colorB = 300/window.window.innerWidth*150;
  const colorC = 300/(window.innerHeight+window.innerWidth)*400;

  const color = `rgb(${colorA}, ${colorB}, ${colorC})`
  container.style.backgroundColor=color.toString();
 }

 window.onresize = changeBackground;
 
