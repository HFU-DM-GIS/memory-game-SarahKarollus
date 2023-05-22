const cards = document.querySelectorAll(".card");  // Selektiere alle Elemente mit der Klasse "card"
const resetButton = document.querySelector("#reset"); // Selektiere das Element mit der ID "reset"
const cardCountSelect = document.getElementById("card-count"); // Selektiere das Dropdown-Menü
const memoryGame = document.getElementById("memoryGame"); // Selektiere den Container für die Karten
let numberOfCards = 6;
let firstCard;
let secondCard;
let cardCounter = 0;
let bildArray = [];

// let timerinterval;
// let seconds = 0;

/* Timer versuch 1
let seconds = 0,
minutes = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }

//format time before displaying 

let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById("timer").innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
  };

setInterval(timeGenerator, 1000);

*/
// Timer versuch 1 Ende

/*Timer versuch 2

//Timer wird gestartet
function startTimer() { 
  timerInterval = setInterval(() => {
    seconds++;
    displayTimer();
  }, 1000);
}

// Timer wird angezeigt
function displayTimer() {
  const minutes = Math.floor(seconds / 60);
  const formattetSeconds = String(seconds % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `Time: ${minutes}:${formattetSeconds}`;
}

// Timer wird gestoppt
function stopTimer() {
  clearInterval(timerInterval);
}

// Timer wird zurückgesetzt
function resetTimer() {
  stopTimer();
  seconds = 0;
  displayTimer();
}

*/ //Timer versuch 2 Ende


/* API einbinden

cards.forEach(card => {
  fetch('https://api.unsplash.com/photos/random?client_id=' + accessKey)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.urls.regular; // Passe dies entsprechend an, um die gewünschte Bildgröße zu erhalten
      card.style.backgroundImage = `url(${imageUrl})`;
    })
    .catch(error => {
      // Behandle Fehler bei der API-Anfrage
      console.log(error);
    });
});
*/

// Anzahl der Karten ändern:
cardCountSelect.addEventListener("change", (event) => {
if(event.target.value == 6) {
numberOfCards = 6;
}else if(event.target.value == 8) {
numberOfCards = 8;
}else if(event.target.value == 12) {
numberOfCards = 12;
}
changeNumberOfCards();
});


//function selectChange()


  // Arrayliste mit den Karten 
    let allItems = [
    {name: "Spongebob und Patrick als Steaks", image: "spongebob_meat.png"},
    {name: "Spongebob mit fancy Kleid", image: "spongebob_princess.png"}, 
    {name: "Spongebob mit fancy Brille", image: "spongebob_sunglasses.png"}, 
    {name: "Squidward macht Selfie", image: "Squidward.png"},
    {name: "Spongebob im Kostüm", image: "spongebob_costume.png"},
    {name: "Spongebob mit Blume", image: "spongebob_flower.png"},

    {name: "Spongebob und Patrick als Steaks", image: "spongebob_meat.png"},
    {name: "Spongebob mit fancy Kleid", image: "spongebob_princess.png"}, 
    {name: "Spongebob mit fancy Brille", image: "spongebob_sunglasses.png"}, 
    {name: "Squidward macht Selfie", image: "Squidward.png"},
    {name: "Spongebob im Kostüm", image: "spongebob_costume.png"},
    {name: "Spongebob mit Blume", image: "spongebob_flower.png"},
  ];
  let items = [
  ];
  let itemsDouble = [
  ];

changeNumberOfCards();



//Laden wir Karten


function changeNumberOfCards() {
  items = [];
  for(i = 0; i<numberOfCards; i++) {
  items.push(allItems[i]);
  }
  while (memoryGame.firstChild) {
    memoryGame.removeChild(memoryGame.lastChild);
  }
  loadCards();
  
  }


function loadCards() {
  itemsDouble = []; // Array erstellt, wo alles verdoppelt wird
  console.log(itemsDouble);
//double items
for(let j= 0; j<2; j++) { // Ablauf 2 Mal
for(let y= 0; y<items.length; y++) { //Alle Elemente von items werden in ItemsDouble kopiert
  itemsDouble.push(items[y]);
}
}
//Randomize Array
shuffle(itemsDouble); //Shuffle funktionion wird mit dem Array itemsDOuble aufgerufen. itemsDouble wird so in der FUnktion randomisiert

  for(let i = 0 ; i< itemsDouble.length; i++) { //For schleife mir länge von items Double. Items von ItemsDouble werden in de Webseite ins HTML reingeladen
  let cardClass = document.createElement("div"); //Div erstellt
  cardClass.setAttribute("class", "card"); //Klasse wird definirt für das div
  let imgFrontFace = document.createElement("img"); //Image Element wird erstellt
  imgFrontFace.setAttribute("class", "front-face"); //Bekommt die klasse front-face
  imgFrontFace.setAttribute("src", "questionMark.png"); //Bild wird in das Image element reingeladen aus dem array
  imgFrontFace.setAttribute("realImageSource", itemsDouble[i].image)
  imgFrontFace.setAttribute("width", "100px"); //breite
  imgFrontFace.setAttribute("height", "100px"); //höhe
  cardClass.appendChild(imgFrontFace); //img Element wird in das div angehängt
  memoryGame.appendChild(cardClass); //Das div wird an die section angehängt

  imgFrontFace.addEventListener(  //In dem Event listener wird das IMG ELEMENT imgFrontFace an die function flipCard weitergegeben
    "click", 
    function() {          
      flipCard(imgFrontFace);  //flipCard function wird aufgerufen mit der jeweiligen Karte um damit zu arbeiten
    }, 
    false //weil gegoogelt addEventListener mit Argumenten
 );
 bildArray.push(imgFrontFace);

  }
}

function flipCard(imgFrontFace) {
  imgFrontFace.setAttribute("src", imgFrontFace.getAttribute("realImageSource"));

  cardCounter++;
  if(cardCounter == 1) {
    firstCard = imgFrontFace
    console.log(firstCard);

  } else if (cardCounter == 2) {
    secondCard = imgFrontFace
    console.log(secondCard);

  } else {
    cardCounter = 1;
    firstCard = imgFrontFace
    console.log(firstCard);

    secondCard = null;
  }

  if(cardCounter == 2) {
  if(firstCard.getAttribute("realImageSource") == secondCard.getAttribute("realImageSource")) {
    console.log("Stimmt");
  }else {
    console.log("Stimmt nicht");

    setTimeout(() => {  // es wird ein Timer von 1000 ms gestartet bevor die Funktion fortgesetzt wird.
      imgFrontFace.setAttribute("src", "questionMark.png");

    }, 1000);

    for(let i = 0;i<bildArray.length; i++) {
      if(firstCard == bildArray[i]) {
        setTimeout(() => {  // es wird ein Timer von 1000 ms gestartet bevor die Funktion fortgesetzt wird.
          bildArray[i].setAttribute("src", "questionMark.png");
    
        }, 1000);
      }
    }

  }
}


}


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
// Setzt die Variablen für das Umdrehen der Karten zurück
function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


// Fügt einen Event Listener für das Umkehren der Karten hinzu
cards.forEach((card) => card.addEventListener("click", flipCard));

// Fügt einen Event Listener für den "Reset" Button hinzu, der die Seite neu lädt
resetButton.addEventListener("click", () => {
  location.reload();
});