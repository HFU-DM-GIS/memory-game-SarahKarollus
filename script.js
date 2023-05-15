const cards = document.querySelectorAll(".card");  // Selektiere alle Elemente mit der Klasse "card"
const resetButton = document.querySelector("#reset"); // Selektiere das Element mit der ID "reset"
const cardCountSelect = document.getElementById("card-count"); // Selektiere das Dropdown-Menü
const memoryGame = document.getElementById("memoryGame"); // Selektiere den Container für die Karten
let cardNumber = 6;

// Anzahl der Karten ändern:

//select.addEventListener("change", selectChange);

// API einbinden
 
const accessKey = Ht2EK3qiirwzPCh48aA6O5tmuHaH3MMeaM51QLZcNJE; // Access Key

fetch('https://api.unsplash.com/photos/random?client_id=' + accessKey)
  .then(response => response.json())
  .then(data => {
    const imageUrl = data.urls.regular; // Passe dies entsprechend an, um die gewünschte Bildgröße zu erhalten
    // Verwende die imageUrl, um das Bild in deiner Anwendung einzufügen
  })
 .catch(error => {
    // Behandle Fehler bei der API-Anfrage
    console.log(error

//function selectChange()


  // Arrayliste mit den Karten 
    const items = [
    {name: "Spongebob und Patrick als Steaks", image: "spongebob_meat.png"},
    {name: "Spongebob mit fancy Kleid", image: "spongebob_princess.png"}, 
    {name: "Spongebob mit fancy Brille", image: "spongebob_sunglasses.png"}, 
    {name: "Squidward macht Selfie", image: "Squidward.png"},
    {name: "Spongebob im Kostüm", image: "spongebob_costume.png"},
    {name: "Spongebob mit Blume", image: "spongebob_flower.png"},
  ];

// Timer 
let seconds = 0,
minutes = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }

//format time before displaying 
let secondsValue = seconds < 10 ?  `0${seconds}` :
seconds;
let minutesValue = minutes < 10 ?  `0${minutes}` :
minutes;
timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};





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
  imgFrontFace.setAttribute("src", itemsDouble[i].image); //Bild wird in das Image element reingeladen aus dem array
  imgFrontFace.setAttribute("width", "100px"); //breite
  imgFrontFace.setAttribute("height", "100px"); //höhe

  cardClass.appendChild(imgFrontFace); //img Element wird in das div angehängt
  memoryGame.appendChild(cardClass); //Das div wird an die section angehängt

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



// Initialisiere Variablen für das umdrehen der Karten
let flippedCard = false;  // wurde eine Karte umgedreht?
let lockBoard = false;  // sperrt das Board, während Karten überprüft werden
let firstCard, secondCard;    // hält die beiden Karten, die verglichen werden


// wird ausgeführt, wenn man auf eine Karte klickt
function flipCard() {
  if (lockBoard) return;            // prüft ob das Board geperrt ist
  if (this === firstCard) return;   // Prüft ob zweimal auf die selbe Karte geklickt wurde
                                    // wenn einer der zwei fälle zutrifft, wird die Funktion hier beendet
  
 // wenn noch keine Karte umgedreht wurde:
 if (!flippedCard) {
  
  // Hinzufügen von Klassen zur ersten Karte, um sie als ausgewählt und umgedreht zu markieren
    this.classList.add("selected");   
    console.log(this.firstChild);   // Konsolenausgabe für Debugging-Zwecke
    this.firstChild.classList.add("flipped");   
    flippedCard = true;
    firstCard = this;
    return;
  }
  
  // wenn schon eine Karte umgedreht wurde:
  this.classList.add("selected");
  this.firstChild.classList.add("flipped");
  secondCard = this;
  checkForMatch();    //Weiter zur function checkForMatch
}

// Überprüfung auf Kartenübereinstimmung
function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) { // prüft ob die "dataset.card" Eigenschaften der karten übereinstimmen
    disableCards();   // wenn sie übereinstimmen, wird die Funktion "disableCards" ausgeführt. die Karten werden aus dem Spiel "entfernt" bzw gefreezed
    return;
  }

  unflipCards();  // wenn sie nicht übereinstimmen wird die Funktion "unflipCards" ausgeführt und die Karten werden wieder umgedreht
}

// Deaktiviert die ersten beiden Karten und setzt das Board zurück
function disableCards() {
  
  // die "click"-Eventlistener von beiden Karten werden entfernt, damit die "flipCard" Funktion nicht mehr ausgeführt werden kann
  firstCard.removeEventListener("click", flipCard);   
  secondCard.removeEventListener("click", flipCard);
  
  // die Klassen "correct" werden hizugefügt um ein Paar zu symbolisieren
  firstCard.classList.add("correct");
  secondCard.classList.add("correct");
 
  //  firstCard, secondCard, flippedCard und lockBoard werden zurückgesetzt und es kann weiter gespielt werdenn.
  resetBoard();
}

// Dreht beiden Karten zurück wenn diese nicht übereinstimmen 
function unflipCards() {
  lockBoard = true;
  firstCard.classList.add("incorrect"); // fügt die klasse "incorrect" hinzu
  secondCard.classList.add("incorrect");  // fügt die klasse "incorrect" hinzu

  // Das Board wird gesperrt -> es wird verhindert, dass keine weiteren Karten ausgewählt werden können
  setTimeout(() => {  // es wird ein Timer von 1000 ms gestartet bevor die Funktion fortgesetzt wird.
    
    firstCard.classList.remove("selected", "incorrect");    // nach Ablauf des Timers: klassen "selected"
    secondCard.classList.remove("selected", "incorrect");   // und "incorrect" werden von den Karte entfernt.
    
    firstCard.firstChild.classList.remove("flipped");     // die Klasse "flipped" wird von den ersten beiden Kindelementen beider Karten entfernt
    secondCard.firstChild.classList.remove("flipped");    // wodurch die Karten wieder umgedreht werden.
    resetBoard();   // das Board wird mit der Funktion "resetBoard" zurückgesetzt
  }, 1000);
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
