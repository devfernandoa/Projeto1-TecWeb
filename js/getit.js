function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvases = document.querySelectorAll('.card-canvas');
const body = document.querySelector('body');
const appbar = document.querySelector('.appbar');
const cards = document.querySelectorAll('.card');
const deleteButtons = document.querySelectorAll('.btn-delete');
const editButtons = document.querySelectorAll('.btn-edit');
const cardTitles = document.querySelectorAll('.card-title');
const cardContents = document.querySelectorAll('.card-content');
const cardForm = document.querySelector('.form-card');
const formCardTitle = document.querySelector('.form-card-title');
const formAutoresize = document.querySelector('.autoresize');
const nightModeToggle = document.querySelector('#night-mode-toggle');

canvases.forEach(canvas => {
  const context = canvas.getContext('2d');
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener('mousedown', e => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener('mousemove', e => {
    if (isDrawing) {
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  canvas.addEventListener('mouseout', () => {
    isDrawing = false;
  });
});

const NIGHT_MODE_KEY = 'night-mode';

function toggleNightMode() {
  body.classList.toggle('night-mode');
  appbar.classList.toggle('night-mode');
  cards.forEach(card => card.classList.toggle('night-mode'));
  deleteButtons.forEach(button => button.classList.toggle('night-mode'));
  editButtons.forEach(button => button.classList.toggle('night-mode'));
  canvases.forEach(canvas => canvas.classList.toggle('night-mode'));
  cardTitles.forEach(title => title.classList.toggle('night-mode'));
  cardContents.forEach(content => content.classList.toggle('night-mode'));
  cardForm.classList.toggle('night-mode');
  formCardTitle.classList.toggle('night-mode');
  formAutoresize.classList.toggle('night-mode');
  nightModeToggle.classList.toggle('night-mode');
}


const nightModeEnabled = localStorage.getItem(NIGHT_MODE_KEY) === 'true';

if (nightModeEnabled) {
  toggleNightMode();
}

document.querySelector('#night-mode-toggle').addEventListener('click', () => {
  toggleNightMode();
  localStorage.setItem(NIGHT_MODE_KEY, body.classList.contains('night-mode'));
});

let draggedCard = null;

for (let i = 0; i < cards.length; i++) {
  let card = cards[i];
  let canvas = canvases[i]

  card.addEventListener('dragstart', function (event) {
    draggedCard = this;
    setTimeout(() => {
      this.style.display = 'none';
    }, 0);
  });

  card.addEventListener('dragend', function (event) {
    draggedCard = null;
    setTimeout(() => {
      this.style.display = 'block';
    }, 0);
  });

  card.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  card.addEventListener('dragenter', function (event) {
    event.preventDefault();
    this.style.transform = 'scale(1.1)';
  });

  card.addEventListener('dragleave', function (event) {
    this.style.transform = 'scale(1)';
  });

  card.addEventListener('drop', function (event) {
    event.preventDefault();
    this.style.transform = 'scale(1)';
    if (draggedCard !== this) {
      let draggedCardIndex = Array.prototype.indexOf.call(cards, draggedCard);
      let dropCardIndex = Array.prototype.indexOf.call(cards, this);
      if (draggedCardIndex < dropCardIndex) {
        this.parentNode.insertBefore(draggedCard, this.nextSibling);
      } else {
        this.parentNode.insertBefore(draggedCard, this);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Faz textarea aumentar a altura automaticamente
  let textareas = document.getElementsByClassName("autoresize");
  for (let i = 0; i < textareas.length; i++) {
    let textarea = textareas[i];
    function autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    textarea.addEventListener("input", autoResize, false);
  }

  // Sorteia classes de cores aleatoriamente para os cards
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.className += ` card-color-${getRandomInt(
      1,
      5
    )} card-rotation-${getRandomInt(1, 11)}`;
  }
});
