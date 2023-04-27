
const cards = document.querySelectorAll(".card"); // Selektiere alle Elemente mit der Klasse "card"
const resetButton = document.querySelector("#reset"); // Selektiere das Element mit der ID "reset"

// Initialisiere Variablen für das umdrehen der Karten
let flippedCard = false;  // wurde eine Karte umgedreht?
let lockBoard = false;  // sperrt das Board, während Karten überprüft werden
let firstCard, secondCard;  // hält die beiden Karten, die verglichen werden

//  wird ausgeführt, wenn man auf eine Karte klickt
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
    disableCards();   // wenn sie übereinstimmen, wird die Funktion "disableCards" ausgeführt. die die Karten werden aus dem Spiel "entfernt"
    return;
  }

  unflipCards();  // wenn sie nicht übereinstimmen wird die Funktio "unflipCartds" ausgeführt und die Karten werden wieder umgedreht
}

// Deaktiviert die ersten beiden Karten und setzt das Board zurück
function disableCards() {
  
  // die "click"-Eventlistener von beiden Karten werden entfernt, damit die "flipCard" Funktion nicht mehr ausgeführt werden kann
  firstCard.removeEventListener("click", flipCard);   
  secondCard.removeEventListener("click", flipCard);
  
  // die klassen "correct" werde hizugefügt um ein Paar zu symbolisieren
  firstCard.classList.add("correct");
  secondCard.classList.add("correct");
 
  //  firstCard, secondCard, flippedCard und lockBoard werden zurückgesetzt un es kann weiter gespielt werdenn.
  resetBoard();
}

// Dreht beiden Karten zurück wen diese nicht übereinstimmen 
function unflipCards() {
  lockBoard = true;
  firstCard.classList.add("incorrect"); // fügt die klasse "incorrect" hinzu
  secondCard.classList.add("incorrect");  // fügt die klasse "incorrect" hinzu

  // Das Board wird gesperrt -> es wird verhindert, dass keine weiteren karten ausgewählt werden können
  setTimeout(() => {  // es wird ein Timer von 1000 ms gestartet bevor die Funktio fortgesetzt wird.
    
    firstCard.classList.remove("selected", "incorrect");    // nach ablauf des Timers: klassen "selected"
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
