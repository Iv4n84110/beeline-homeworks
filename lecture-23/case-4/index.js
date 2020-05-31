logSelection = (event) => {
  const log = document.getElementById('log');
  const selection = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);
  if (selection == "досчатый") log.textContent = "Правильно!"
  else log.textContent = "Учи русский язык!";
}

const input = document.querySelector('input');
input.addEventListener('select', logSelection);