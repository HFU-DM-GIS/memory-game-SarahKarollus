const cards = document.querySelectorAll(".card");  // Selektiert alle Elemente mit der Klasse "card" und speichert sie in der Variable cards 
const resetButton = document.querySelector("#reset"); // Selektiert das Element mit der ID "reset" und speichert sie in der Variable "resetButton"
const cardCountSelect = document.getElementById("card-count"); // Selektiert das Dropdown-Menü und speichert es in der Variable "cardCountSelect" -> ermöglicht dem Spieler, die Anzahl der Karten im Spiel auszuwählen.
const memoryGame = document.getElementById("memoryGame"); // Selektiert den Container für die Karten mit der ID "memoryGame" und speichert in der Variable "memoryGame"
//const buttonSearch = document.getElementById("buttonSearch"); //Element mit der ID "buttonSearch" wird ausgewählt und in der Variable buttonSearch gespeichert (dies Element repräsentiert den Suchbutton für die Bilder von Unsplash)

const form = document.getElementById("theme-search");

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

window.onload = function () { //wird ausgeführt, wenn die Seite geladen ist
  openPopup(); //öffnet das Popup
};

function openPopup() { //öffnet das Popup
  let popup = document.getElementById('popup'); //Element mit der ID "popup" wird ausgewählt und in der Variable popup gespeichert
  popup.style.display = 'block'; //das Popup wird angezeigt
  console.log("popup opened"); 
}

function closePopup() { //schließt das Popup
  let popup = document.getElementById('popup'); //Element mit der ID "popup" wird ausgewählt und in der Variable popup gespeichert
  popup.style.display = 'none'; //das Popup wird ausgeblendet
  console.log("popup closed");
}



//leaderboardscore aus localstorage holen

window.addEventListener("load", function () {   //sind bereits scores gespeichert? 
  if (localStorage.getItem("leaderboardTimes")){  //wenn ja, dann werden sie aus dem localstorage geholt und in das leaderboard geschrieben
    leaderboardTimes = JSON.parse(localStorage.getItem("leaderboardTimes"));  //JSON.parse wandelt die Daten in ein Array zurück
    displayLeaderboard();
  }
});





form.addEventListener("submit", changeSearch); //Event Listener wird hinzugefügt, der auf den Klick des Suchbuttons reagiert und die Funktion changeSearch aufruft

buttonSearch.addEventListener("click", changeSearch); //Event Listener wird hinzugefügt, der auf den Klick des Suchbuttons reagiert und die Funktion changeSearch aufruft 




//Funktion changeSearch wird definiert. Diese Funktion wird aufgerufen, wenn der Suchbutton geklickt wird(weil EventListener) ->  liest den Wert aus dem Sucheingabefeld und aktualisiert das Suchthema und die requestUrl für die API-Anfrage.
function changeSearch(evt) { //wichtig für die API -Anfrage
  evt.preventDefault(); //verhindert, dass die Seite neu geladen wird, wenn der Suchbutton geklickt wird
  console.log("we search for the term: " + searchInput.value); //zeigt auf der Konsole das Thema, was gesucht wurde
  search = searchInput.value; //Suchthema wird aktualisiert
  requestUrl = 'https://api.unsplash.com/search/photos?query=' + search + '&client_id=E8TYrZZgnie-WW-SL56ax-ov-lglR0flS5nzNSSg3b0';
  allItems = []; //listen dann die ganzen Items, die in Frage kommen ----> vielleicht kann man hier ändern, damit nicht doppeltes bild
  changeNumberOfCards(); //Funktion changeNumberOfCards wird aufgerufen
};



//Funktion getAllItems wird definiert. Diese Funktion ruft Bilder von Unsplash ab und speichert sie im Array allItems.
async function getAllItems() { //async wird verwendet, um asynchrone Funktionen zu definieren. Async-Funktionen sind Funktionen, die immer einen Promise zurückgeben. 
  for (let i = 0; i <= 12; i++) { //Schleife wird 12 mal durchlaufen
    let randomImage = await getNewImage(); //Funktion getNewImage wird aufgerufen und das Ergebnis wird in der Variable randomImage gespeichert

    // Überprüfung, ob das randomImage bereits im allItems-Array vorhanden ist
    let foundDuplicate = false; 
    for (let y = 0; y < allItems.length; y++) { //Schleife wird so oft durchlaufen, wie das Array lang ist
      if (allItems[y] && randomImage === allItems[y].image) { //Wenn das Bild bereits im Array vorhanden ist, wird die Schleife abgebrochen
       // console.log("Gefundenes Bild " + randomImage + " existiert bereits als " + allItems[y].image); 
        foundDuplicate = true; 
        break; // Beendet die Schleife, da das Duplikat gefunden wurde
      }
    }

    // Wenn ein Duplikat gefunden wurde, wiederhole den Codeblock
    if (foundDuplicate) { 
      i--; // Verringere den Index, um den aktuellen Durchlauf zu wiederholen
      continue; // Springe zur nächsten Iteration der äußeren Schleife
    }else {
      allItems.push({ name: "image" + i, image: randomImage }); //Wenn das Bild noch nicht im Array vorhanden ist, wird es in das Array gepusht

    }

  }
}


//Funktion getNewImage wird definiert. Diese Funktion ruft ein zufälliges Bild von Unsplash basierend auf dem aktuellen Suchthema ab und gibt die URL des Bildes zurück
async function getNewImage() { 
  let randomNumber = Math.floor(Math.random() * 10); //10 Bilder von einer Seite werden gepickt
  let randomPage = Math.floor(Math.random() * 3); //3 Seiten stehen zur Verfügung (wichtig hier wenig zu haben, weils sonst zu lange lädt)
  let pageUrl = requestUrl + '&page=' + randomPage;  //eine URL, die sowohl die Basis-URL als auch den Seitenparameter enthält -> später verwendet, um die Bilder von Unsplash abzurufen
  // console.log("zufälliges Bild" + randomPage);


  return fetch(pageUrl)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      if (data.total == 0) {
        throw new Error("did not found any images");
      }
      let allImages = data.results[randomNumber];
      return allImages.urls.regular;
    }).catch((error) => {
      console.log("error fetching images:" + error);
      // search for dog as fallback
        
      console.log("error fetching images:" + error);
      alert("Zu diesem Thema konnten keine Bilder gefunden werden");
      return Promise.reject(error); // Fehler weiterleiten

    }
    );

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
  console.log("karteanzahl: " + numberOfCards + " " + items)
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

// Timer für highscore wird definiert


let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let leaderboardTimes = [];

function startTimer() {
  document.getElementById('start').disabled = true; //start button wird disabled
  document.getElementById('stop').disabled = false; //stop button wird enabled
  timerInterval = setInterval(updateTimer, 1000); //setInterval wird aufgerufen mit der function updateTimer -> wird alle 1000ms aufgerufen
  console.log("start Timer");
}

function stopTimer() {
  document.getElementById('start').disabled = false; //start button wird enabled
  document.getElementById('stop').disabled = true; //stop button wird disabled
  clearInterval(timerInterval); //setInterval wird gestoppt
  

  let formattedTime = document.getElementById('timer').textContent; //Zeit wird aus dem HTML Element mit der ID timer geholt
  leaderboardTimes.push(formattedTime); //Zeit wird in das array leaderboardTimes gepusht

  console.log("stop Timer");
  console.log("Zeit: " + formattedTime);

  localStorage.setItem("leaderboardTimes", JSON.stringify(leaderboardTimes));   //Zeit wird in local storage gespeichert. JSON.stringify wandelt das array in einen string um, damit es im local storage gespeichert werden kann.
  console.log("leaderboardTimes: " + leaderboardTimes);
}


function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  let formattedTime = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds); //Funktion pad wird aufgerufen um die Zeit richtig darzustellen 
  document.getElementById('timer').textContent = formattedTime; //Zeit wird in das HTML Element mit der ID timer geschrieben
}

function pad(value) { //Funktion um die Zeit richtig darzustellen   
  if (value<10){  
    return "0" + value; //Wenn die Zeit kleiner als 10 ist, wird eine 0 vor die Zeit gesetzt für die ansicht 0*:0*:0*
  }
  else{
    return value; //Wenn die Zeit größer als 10 ist, wird die Zeit normal angezeigt
  }
  // advanced: return value < 10 ? '0' + value : value;
}

document.getElementById('start').addEventListener('click', startTimer); 
document.getElementById('stop').addEventListener('click', stopTimer); 

clearInterval(timerInterval); //Timer wird zurückgesetzt
let formattedTime = document.getElementById('timer').textContent; //Die Zeit wird in das HTML Element mit der ID timer geschrieben
leaderboardTimes.push(formattedTime);  //Die Zeit wird in das Array leaderboardTimes geschrieben
console.log("Zeit: " + formattedTime);  

function displayLeaderboard() { 
  let leaderboardElement = document.getElementById('leaderboard'); 

  // das Leaderboard wird geleert, um es neu zu befüllen
  leaderboardElement.innerHTML = ''; 

  // Durchlaufe die gespeicherten Zeiten und füge sie zum Leaderboard hinzu
  for (let i = 0; i < leaderboardTimes.length; i++) { // i wird um 1 erhöht, bis es gleich der länge des Arrays ist
    let timeEntry = document.createElement('li'); //li Element wird erstellt
    timeEntry.textContent = leaderboardTimes[i]; //Zeit wird in das li Element geschrieben
    leaderboardElement.appendChild(timeEntry); //li Element wird an das ul Element angehängt
  }
}
document.getElementById('show-leaderboard').addEventListener('click', displayLeaderboard); //Funktion displayLeaderboard wird aufgerufen wenn der Button mit der ID show-leaderboard angeklickt wird
// Timer für highscore ende



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
  console.log("click on reset button");
  location.reload();
});


