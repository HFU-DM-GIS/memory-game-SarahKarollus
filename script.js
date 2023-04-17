const cards = document.querySelectorAll(".card");
const resetButton = document.querySelector("#reset");
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  if (!flippedCard) {
    this.classList.add("selected");
    console.log(this.firstChild);
    this.firstChild.classList.add("flipped");
    flippedCard = true;
    firstCard = this;
    return;
  }
  this.classList.add("selected");
  this.firstChild.classList.add("flipped");
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  firstCard.classList.add("correct");
  secondCard.classList.add("correct");
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  firstCard.classList.add("incorrect");
  secondCard.classList.add("incorrect");

  setTimeout(() => {
    firstCard.classList.remove("selected", "incorrect");
    secondCard.classList.remove("selected", "incorrect");
    firstCard.firstChild.classList.remove("flipped");
    secondCard.firstChild.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => card.addEventListener("click", flipCard));
resetButton.addEventListener("click", () => {
  location.reload();
});
