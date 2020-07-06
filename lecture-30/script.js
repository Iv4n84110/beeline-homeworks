window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = 'Вы действительно хотите закрыть эту вкладку?';
});

input =() => {
  const num = prompt('Введите число')
  window.frames[0].postMessage(num, '*')
  console.log(window.frames[0].document.querySelector('.number').innerHTML);
}

window.frames[0].addEventListener("message", (event)=>{
  const data = +event.data
  window.frames[0].document.querySelector('.number').innerHTML= data;
  window.frames[0].parent.document.querySelector('.number').innerHTML= data + 1;
})


