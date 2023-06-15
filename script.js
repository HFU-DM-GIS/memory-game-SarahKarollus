const cards = document.querySelectorAll(".card");  // Selektiert alle Elemente mit der Klasse "card" und speichert sie in der Variable cards 
const resetButton = document.querySelector("#reset"); // Selektiert das Element mit der ID "reset" und speichert sie in der Variable "resetButton"
const cardCountSelect = document.getElementById("card-count"); // Selektiert das Dropdown-Menü und speichert es in der Variable "cardCountSelect" -> ermöglicht dem Spieler, die Anzahl der Karten im Spiel auszuwählen.
const memoryGame = document.getElementById("memoryGame"); // Selektiert den Container für die Karten mit der ID "memoryGame" und speichert in der Variable "memoryGame"
const buttonSearch = document.getElementById("buttonSearch"); //Element mit der ID "buttonSearch" wird ausgewählt und in der Variable buttonSearch gespeichert (dies Element repräsentiert den Suchbutton für die Bilder von Unsplash)
const searchInput = document.getElementById("theme"); // Eingabefeld mit der ID "theme" wird ausgewählt und in der Variable searchInput gespeichert. In diesem Eingabefeld kann der Spieler ein Suchthema für die Bilder eingeben.
let numberOfCards = 6; //Variable numberOfCards wird mit dem Wert 6 initialisiert. Diese Variable speichert die aktuelle Anzahl der Karten AM ANFANG des Spiels.
let firstCard; //Variable firstCard wird deklariert, um die erste umgedrehte Karte im Spiel zu speichern
let secondCard; //Variable secondCard wird deklariert, um die zweite umgedrehte Karte im Spiel zu speichern
let cardCounter = 0; //Variable cardCounter wird initialisiert und auf 0 gesetzt (Keine Karte ist am Anfang aussgewählt -> alle zeigen noch das Fragezeichen) Diese Variable wird verwendet, um zu verfolgen, ob es sich um die erste oder zweite umgedrehte Karte handelt.
let bildArray = []; // leeres Array bildArray wird erstellt. In diesem Array werden die Image-Elemente der Karten gespeichert
let allItems = []; // leeres Array allItems wird erstellt. In diesem Array werden alle Bilder aus der Unsplash-API gespeichert.
let items = []; //leeres Array items wird erstellt. In diesem Array werden die ausgewählten Bilder für das aktuelle Spiel gespeichert.
let itemsDouble = []; //leeres Array itemsDouble wird erstellt. In diesem Array werden die doppelten Bilder (weil Memory) für das aktuelle Spiel gespeichert.
let search = "dog"; //Variable search wird mit dem anfänglichen Suchthema "dog" initialisiert. Dieses Suchthema wird verwendet, um Bilder von Unsplash abzurufen.
let requestUrl =
  'https://api.unsplash.com/search/photos?query=' + search + '&client_id=E8TYrZZgnie-WW-SL56ax-ov-lglR0flS5nzNSSg3b0';
//Variable requestUrl wird erstellt, die die URL für die API-Anfrage an Unsplash enthält. Das Suchthema wird in die URL eingefügt.

window.onload = function () {
  openPopup();
};

function openPopup() {
  let popup = document.getElementById('popup');
  popup.style.display = 'block';
}

function closePopup() {
  let popup = document.getElementById('popup');
  popup.style.display = 'none';
}



buttonSearch.addEventListener("keypress", changeSearch); //Event Listener wird hinzugefügt, der auf den Klick des Suchbuttons reagiert und die Funktion changeSearch aufruft 

if (changeSearch.key === 'Enter') {
  // Hier kannst du den Code ausführen, der auf die Eingabetaste reagieren soll
  console.log('Enter wurde gedrückt');
}; 

//Funktion changeSearch wird definiert. Diese Funktion wird aufgerufen, wenn der Suchbutton geklickt wird(weil EventListener) ->  liest den Wert aus dem Sucheingabefeld und aktualisiert das Suchthema und die requestUrl für die API-Anfrage.
function changeSearch() { //wichtig für die API -Anfrage

  console.log("we search for the term: " + searchInput.value); //zeigt auf der Konsole das Thema, was gesucht wurde
  search = searchInput.value;
  requestUrl = 'https://api.unsplash.com/search/photos?query=' + search + '&client_id=E8TYrZZgnie-WW-SL56ax-ov-lglR0flS5nzNSSg3b0';
  allItems = []; //listen dann die ganzen Items, die in Frage kommen
  changeNumberOfCards();
};


//Funktion getAllItems wird definiert. Diese Funktion ruft Bilder von Unsplash ab und speichert sie im Array allItems.
async function getAllItems() { //Funktion getAllItems wird definiert (verwendet den Asynchron-Modifikator async ) -> bedeutet, dass die Funktion asynchronen Code enthält und auf asynchrone Operationen (Netzwerkanfragen) zugreift
  for (let i = 0; i <= 12; i++) { //for-Schleife wird verwendet, um 12 Wiederholungen durchzuführen. Der Schleifenindex i wird von 0 bis 12 inkrementiert
    let randomImage = await getNewImage(); // in jedem Schleifendurchlauf wird die Funktion getNewImage() aufgerufen und das Ergebnis in der Variablen randomImage gespeichert. Das Schlüsselwort await wird verwendet, um die asynchrone Funktion getNewImage() zu pausieren und auf das Ergebnis zu warten, bevor es fortgesetzt wird
    allItems.push({ name: "image" + i, image: randomImage }); //Objekt {name: "image" +i, image: randomImage} wird zum Array allItems hinzugefügt (Objekt enthält zwei Eigenschaften: name und image) Der Wert der name-Eigenschaft wird als "image" zusammen mit dem aktuellen Schleifenindex i festgelegt, um ein eindeutigen Namen für jedes Bild zu generieren. Der Wert der image-Eigenschaft ist das zufällig abgerufene Bild (randomImage)
    // console.log(allItems);
  }
}
//Funktion getNewImage wird definiert. Diese Funktion ruft ein zufälliges Bild von Unsplash basierend auf dem aktuellen Suchthema ab und gibt die URL des Bildes zurück
async function getNewImage() {
  let randomNumber = Math.floor(Math.random() * 10); //10 Bilder von einer Seite werden gepickt
  let randomPage = Math.floor(Math.random() * 3); //3 Seiten stehen zur Verfügung (wichtig hier wenig zu haben, weils sonst zu lange lädt)
  let pageUrl = requestUrl + '&page=' + randomPage;  //eine URL, die sowohl die Basis-URL als auch den Seitenparameter enthält -> später verwendet, um die Bilder von Unsplash abzurufen
  console.log("zufälliges Bild" + randomPage);


  return fetch(pageUrl)
    .then((response) => response.json())
    .then((data) => {
      let allImages = data.results[randomNumber];
      return allImages.urls.regular;
    });

}



// Event Listener wird hinzugefügt, der auf Änderungen im Dropdown-Menü für die Anzahl der Karten reagiert. Wenn sich die Auswahl ändert, wird die Funktion changeNumberOfCards aufgerufen.
cardCountSelect.addEventListener("change", (event) => {
  if (event.target.value == 6) {
    numberOfCards = 6;
  } else if (event.target.value == 8) {
    numberOfCards = 8;
  } else if (event.target.value == 12) {
    numberOfCards = 12;
  }
  changeNumberOfCards();
});


changeNumberOfCards(); //Funktion changeNumberOfCards wird aufgerufen, um das Spiel mit der ursprünglich ausgewählten Anzahl von Karten zu starten




//Funktion changeNumberOfCards wird definiert. Diese Funktion ändert die Anzahl der Karten im Spiel basierend auf der ausgewählten Option im Dropdown-Menü. Sie ruft auch die Funktion getAllItems auf, um neue Bilder von Unsplash abzurufen und die Karten zu laden
async function changeNumberOfCards() {
  await getAllItems();
  items = [];
  for (i = 0; i < numberOfCards; i++) {
    items.push(allItems[i]);
  }
  while (memoryGame.firstChild) {
    memoryGame.removeChild(memoryGame.lastChild);
  }
  console.log("karteanzahl" + items)
  loadCards();

}

//Funktion loadCards wird definiert. Diese Funktion lädt die Karten in den Spielbereich (memoryGame) basierend auf den ausgewählten Bildern
function loadCards() {
  itemsDouble = []; // Array erstellt, wo alles verdoppelt wird
  console.log("Array mit verdoppelten items");
  console.log(itemsDouble);

  //double items
  for (let j = 0; j < 2; j++) { // Ablauf 2 Mal
    for (let y = 0; y < items.length; y++) { //Alle Elemente von items werden in ItemsDouble kopiert
      itemsDouble.push(items[y]);
    }
  }
  //Randomize Array
  shuffle(itemsDouble); //Shuffle funktion wird mit dem Array itemsDouble aufgerufen. itemsDouble wird so in der FUnktion randomisiert

  for (let i = 0; i < itemsDouble.length; i++) { //For schleife mir länge von items Double. Items von ItemsDouble werden in de Webseite ins HTML reingeladen
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
      function () {
        flipCard(imgFrontFace);  //flipCard function wird aufgerufen mit der jeweiligen Karte um damit zu arbeiten
      },
      false //weil gegoogelt addEventListener mit Argumenten
    );
    bildArray.push(imgFrontFace);

  }
}

//Funktion flipCard wird definiert. Diese Funktion wird aufgerufen, wenn eine Karte angeklickt wird. Sie dreht die Karte um und überprüft, ob zwei umgedrehte Karten übereinstimmen oder nicht.
function flipCard(imgFrontFace) { //Bild wird angeklickt -> Funktion flipCard wird aufgerufen -> imgFrontFace ist das angeklickte Bild und wird an Funktion weitergegeben
  imgFrontFace.setAttribute("src", imgFrontFace.getAttribute("realImageSource")); // -> hier verändern wir von questionmark zum richtigen Bild  ->setzt die "src"-Eigenschaft des Bildes auf den Wert der "realImageSource"-Eigenschaft (enthält den  Pfad zur eigentlichen Bildquelle) ((sonst ist es nur das questionmark))


  cardCounter++; // Der Wert von "cardCounter" wird um eins erhöht -> "cardCounter" verfolgt+prüft ob es sich um die erste oder zweite Karte handelt 
  if (cardCounter == 1) { //Wenn "cardCounter" gleich 1 ist, wird der folgende Codeblock ausgeführt
    firstCard = imgFrontFace //speichert imgFrontface in die Variable 
    console.log("erste Karte");
    console.log(firstCard);

  } else if (cardCounter == 2) { //Wenn "cardCounter" gleich 2 ist, wird der folgende Codeblock ausgeführt
    secondCard = imgFrontFace //speichert imgFrontFace in die 2. Variable
    console.log("zweite Karte");
    console.log(secondCard);

  } else { //Wenn "cardCounter" weder 1 noch 2 ist, wird der folgende Codeblock ausgeführt -> das Spiel wird auf den Anfangszustand zurückgesetzt  + "cardCounter" auf 1 gesetzt und "secondCard" auf "null" gesetzt
    cardCounter = 1; // die 3. Karte basically ist wieder die erste, weil die beiden davor schon überprüft wurden 
    firstCard = imgFrontFace
    console.log("erste Karte");
    console.log(firstCard);

    secondCard = null; // die zweite Karte von davor wird entfernt 
  }

  if (cardCounter == 2) {
    if (firstCard.getAttribute("realImageSource") == secondCard.getAttribute("realImageSource")) { // Wenn die "realImageSource"-Eigenschaft des ersten Bildes der "realImageSource"-Eigenschaft des zweiten Bildes entspricht, wird "Stimmt" in der Konsole ausgegeben
      console.log("Stimmt");
    } else {
      console.log("Stimmt nicht");

      setTimeout(() => {  // wenn es nicht übereinstimmt,  wird ein Timer von 1000 ms gestartet bevor die Funktion fortgesetzt wird
        imgFrontFace.setAttribute("src", "questionMark.png");  // -> die Funktion ändert das bild wieder zum 2.Bild (questionmark)

      }, 1000); // in Variable verändern   

      for (let i = 0; i < bildArray.length; i++) {
        if (firstCard == bildArray[i]) { // Schauen wo firstCard im BildArray gespeichert ist. An welcher Position. Da nichtmehr auf imgFrontFace von erster Karte zugegriffen werden kann
          setTimeout(() => {  // es wird ein Timer von 1000 ms gestartet bevor die Funktion fortgesetzt wird.
            bildArray[i].setAttribute("src", "questionMark.png");  // An Position wo firstCard in BildArray ist soll die erste Karte auf das Fragezeichen  zurückgesetzt werden

          }, 1000);
        }
      }

    }
  }


}

//Funktion shuffle wird definiert. Diese Funktion mischt ein Array zufällig
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);  // Math.random -> 0 bis 1 
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


// Event Listener wird hinzugefügt, der auf den Klick einer Karte reagiert und die Funktion flipCard aufruft
cards.forEach((card) => card.addEventListener("click", flipCard));

// Fügt einen Event Listener für den "Reset" Button hinzu, der die Seite neu lädt
resetButton.addEventListener("click", () => {
  location.reload();
});
