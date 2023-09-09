const grid = document.querySelector(".grid");
const cards = document.querySelectorAll(".card");
const endGameDivContainer = document.querySelector(".endGameDivContainer");
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const images = [
  "bananas",
  "grapes",
  "orange",
  "pineapple",
  "strawberry",
  "watermelon",
];

let firstCard = "";
let secondCard = "";

const createElements = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled");
  if (disabledCards.length == 12) {
    setTimeout(() => {
      endGameDivContainer.classList.add("active");
    }, 200);
  }
};

const checkCards = () => {
  const firstImage = firstCard.getAttribute("data-image");
  const secondImage = secondCard.getAttribute("data-image");

  if (firstImage === secondImage) {
    firstCard.classList.add("disabled");
    secondCard.classList.add("disabled");

    firstCard = "";
    secondCard = "";
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipedCard");
      secondCard.classList.remove("flipedCard");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const flipCard = (event) => {
  if (event.target.classList.contains("flipedCard")) {
    return;
  }

  if (firstCard == "") {
    event.target.classList.add("flipedCard");
    firstCard = event.target;
  } else if (secondCard == "") {
    event.target.classList.add("flipedCard");
    secondCard = event.target;
    console.log(firstCard, secondCard);

    checkCards();
  }
};

const createCard = (image) => {
  let card = createElements("div", "card");
  let frontCard = createElements("div", "front-card");
  let backCard = createElements("div", "back-card");

  backCard.style.backgroundImage = `url('../assets/${image}.png')`;

  card.appendChild(frontCard);
  card.appendChild(backCard);

  card.addEventListener("click", flipCard);
  card.setAttribute("data-image", image);

  return card;
};

const loadGame = () => {
  const newArrayOfImages = [...images, ...images];

  const shuffledImages = newArrayOfImages.sort(() => Math.random() - 0.5);

  shuffledImages.forEach((images) => {
    const card = createCard(images);
    grid.appendChild(card);
  });
};

window.onload = () => {
  loadGame();
};
