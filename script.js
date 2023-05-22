const cards = document.querySelectorAll(".card");  // Select all elements with the class "card"
const resetButton = document.querySelector("#reset"); // Select the element with the ID "reset"
const cardCountSelect = document.getElementById("card-count"); // Select the dropdown menu
const memoryGame = document.getElementById("memoryGame"); // Select the container for the cards
//  const accessKey = Ht2EK3qiirwzPCh48aA6O5tmuHaH3MMeaM51QLZcNJE; // Access Key

let cardNumber = 6;
let firstCard;
let secondCard;
let cardCounter = 0;
let bildArray = [];


let timerinterval;
let seconds = 0;

// Anzahl der Karten ändern:

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

  // Arrayliste mit den Karten 
    const items = [
    {name: "Spongebob und Patrick als Steaks", image: "spongebob_meat.png"},
    {name: "Spongebob mit fancy Kleid", image: "spongebob_princess.png"}, 
    {name: "Spongebob mit fancy Brille", image: "spongebob_sunglasses.png"}, 
    {name: "Squidward macht Selfie", image: "Squidward.png"},
    {name: "Spongebob im Kostüm", image: "spongebob_costume.png"},
    {name: "Spongebob mit Blume", image: "spongebob_flower.png"},
  ];

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



const options = [
  { label: "6 Karten", value: 6 },
  { label: "8 Karten", value: 8 },
  { label: "12 Karten", value: 12 },
];

//Laden wir Karten
loadCards();



function loadCards() {
  let itemsDouble = []; // Array erstellt, wo alles verdoppelt wird
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

function flipCard(imgFrontFace) { //Bild wird angeklickt -> Funktion flipCard wird aufgerufen -> imgFrontFace ist das angeklickte Bild und wird an Funktion weitergegeben
  imgFrontFace.setAttribute("src", imgFrontFace.getAttribute("realImageSource")); // -> hier verändern wir von questionmark zum richtigen Bild  ->setzt die "src"-Eigenschaft des Bildes auf den Wert der "realImageSource"-Eigenschaft (enthält den  Pfad zur eigentlichen Bildquelle) ((sonst ist es nur das questionmark))

  cardCounter++;       // Der Wert von "cardCounter" wird um eins erhöht -> "cardCounter" verfolgt+prüft ob es sich um die erste oder zweite Karte handelt 
  if(cardCounter == 1) {     //Wenn "cardCounter" gleich 1 ist, wird der folgende Codeblock ausgeführt
    firstCard = imgFrontFace //speichert imgFrontface in die Variable 
    console.log(firstCard);

  } else if (cardCounter == 2) {    //Wenn "cardCounter" gleich 2 ist, wird der folgende Codeblock ausgeführt
    secondCard = imgFrontFace //speichert imgFrontFace in die 2. Variable
    console.log(secondCard);

  } else { //Wenn "cardCounter" weder 1 noch 2 ist, wird der folgende Codeblock ausgeführt -> das Spiel wird auf den Anfangszustand zurückgesetzt  + "cardCounter" auf 1 gesetzt und "secondCard" auf "null" gesetzt
    cardCounter = 1; // die 3. Karte basically ist wieder die erste, weil die beiden davor schon überprüft wurden 
    firstCard = imgFrontFace
    console.log(firstCard);

    secondCard = null; // die zweite Karte von davor wird entfernt 
  }

  if(cardCounter == 2) { 
  if(firstCard.getAttribute("realImageSource") == secondCard.getAttribute("realImageSource")) { // Wenn die "realImageSource"-Eigenschaft des ersten Bildes der "realImageSource"-Eigenschaft des zweiten Bildes entspricht, wird "Stimmt" in der Konsole ausgegeben
    console.log("Stimmt"); 
  }else {
    console.log("Stimmt nicht");

    setTimeout(() => {  // wenn es nicht übereinstimmt,  wird ein Timer von 1000 ms gestartet bevor die Funktion fortgesetzt wird
      imgFrontFace.setAttribute("src", "questionMark.png");  // -> die Funktion ändert das bild wieder zum 2.Bild (questionmark)

    }, 1000);

    for(let i = 0;i<bildArray.length; i++) { 
      if(firstCard == bildArray[i]) { // Schauen wo firstCard im BildArray gespeichert ist. An welcher Position. Da nichtmehr auf imgFrontFace von erster Karte zugegriffen werden kann
        setTimeout(() => {  // es wird ein Timer von 1000 ms gestartet bevor die Funktion fortgesetzt wird.
          bildArray[i].setAttribute("src", "questionMark.png");    // An Position wo firstCard in BildArray ist soll die erste Karte auf das Fragezeichen  zurückgesetzt werden
    
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

// Get the timer element
var timerElement = document.getElementById("timer");

// Function to start the timer
function startTimer() {
  var seconds = 0;
  setInterval(function () {
    seconds++;
    timerElement.textContent = "Time: " + seconds + "s";
  }, 1000);
}

// Call the startTimer function whenever a card is flipped

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", startTimer);
}
