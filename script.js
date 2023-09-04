const body = document.body;
const randomBox = document.getElementById("randomBox");
const boxes = document.querySelectorAll(".box");
let attempts = 0;
const maxAttempts = 6;
let rotationCount = 0;
let lastPosition;
let currentColor = getRandomColor();
randomBox.classList.add("breathe-animation");
randomBox.style.backgroundColor = currentColor;

window.addEventListener("focus", onAlertClose);
boxes.forEach((box) => {
  box.addEventListener("click", function () {
    box.classList.add("wave-animation");
    setTimeout(() => box.classList.remove("wave-animation"), 600);
    attempts++;

    if (box.style.backgroundColor === currentColor) {
      alert("Los colores coinciden!");
      randomBox.classList.add("explode-animation");
      playSound("./sounds/success.mp3", true);
      setTimeout(() => {
        randomBox.classList.remove("explode-animation");
        randomBox.style.transform = "scale(1)";
        randomBox.style.opacity = "1";

        currentColor = getRandomColor(currentColor);
        randomBox.style.backgroundColor = currentColor;
      }, 1000);
    } else {
      alert("Los colores no coinciden.");
      playSound("./sounds/fatality.mp3", true);
      body.classList.add("shake-animation");
      setTimeout(() => body.classList.remove("shake-animation"), 1000);
    }

    if (attempts >= maxAttempts) {
      backgroundSound.pause();
      alert("Has alcanzado el número máximo de intentos.");
      playSound("./sounds/end_game.mp3", true);
      body.classList.add("fade-effect");
      randomBox.classList.add("pulse-animation");
      boxes.forEach((b) => (b.style.pointerEvents = "none"));
    }
  });
});

//Efectos Sonido
const backgroundSound = new Audio("./sounds/its_my_life.mp3");
backgroundSound.loop = true;
backgroundSound.volume = 0.5;
backgroundSound.play();

function playSound(src, interruptBackground = false) {
  const audio = new Audio(src);

  if (interruptBackground) {
    // Si debemos interrumpir el sonido de fondo
    backgroundSound.pause();

    audio.onended = () => {
      // Una vez que el efecto termine, reanudar el sonido de fondo
      backgroundSound.play();
    };
  }

  audio.play();
}

function getRandomColor(excludeColor) {
  const colors = ["red", "blue", "green", "yellow"];
  const availableColors = colors.filter((color) => color !== excludeColor);
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}

function onAlertClose() {
  rotateAndRepositionBoxes();
  rotationCount++;
}

function getRandomPosition() {
  const positions = ["column", "row", "diagonal", "diagonal2", "zero"];
  const availablePositions = lastPosition ? positions.filter(p => p !== lastPosition) : positions;
  
  const randomIndex = Math.floor(Math.random() * availablePositions.length);
  lastPosition = availablePositions[randomIndex];
  return lastPosition;
}

function rotateAndRepositionBoxes() {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.classList.add("rotating");
  });

  setTimeout(() => {
    boxes.forEach((box) => {
      box.classList.remove("rotating");
    });
    repositionBoxes();
  }, 2000);
}

function repositionBoxes() {
  const fixedBoxes = document.getElementById("fixedBoxes");
  const position = getRandomPosition();

  switch (position) {
    case "column":
      fixedBoxes.style.transform = "rotate(90deg)";
      break;
    case "row":
      fixedBoxes.style.transform = "rotate(0deg)";
      break;
    case "diagonal":
      fixedBoxes.style.transform = "rotate(45deg)";
      break;
    case "diagonal":
        fixedBoxes.style.transform = "rotate(125deg)";
        break;
    case "zero":
      fixedBoxes.style.transform = "rotate(180deg)";
      break;
  }
}
