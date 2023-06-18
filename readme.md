# Memory game
A simple memory game.
https://hfu-dm-gis.github.io/memory-game-SarahKarollus/ 

## Source
This app has been created by Julian Katz (and ChatGPT).

## Bug reports

### Bug #01 Card layout not random
The cards are always at the same position and hence there is no fun to play.
#### how to reproduce
The cards are always `[1][2][3][4][1][2][3][4]`.
#### how to solve
Add some random positions to the cards. Note that it makes sense to first generate a randomized list of all positions and then place the cards.

## Tasks
1. Fix all bugs mentioned above.  [DONE]
2. Replace the numbers on the cards with images.  [DONE]
3. Let the user change the number of cards to play with. [DONE]
4. (Optional) Add a timer. [DONE]
5. Add a flipping animation for the cards.
6. Use images that are taken from [the Unsplash API](https://unsplash.com/documentation#get-a-random-photo). Let the user choose a theme (query) and then get enough images for the cards. [DONE]

1. passt die Konsolenausgaben so an, dass sie angeben, was dort ausgegeben wird, z.B. statt console.log(searchInput.value), besser console.log("we search for the term: " + searchInput.value); verwenden. Wenn ihr allerdings die Datenobjekte ausgeben wollt (die von fetch geholt werden), dürft ihr sie nicht wie von mir vorgeschlagen mit einem String verbinden.   [DONE]
2. Formatiert den Code indem ihr in VS Code einmal Alt-Shift-F drückt (unter Windows, am Mac wohl ähnlich)  [DONE]
3. Schreibt eine Anleitung für den User, wie das Spiel funktioniert und welche Buttons was bewirken. Überlegt euch, ob man besser einen Start Button einfügt, so dass man vorher die Einstellungen (Anzahl der Karten und Motive) vornimmt und dann das Spiel beginnt. Diese Struktur sollte sich dann auch wieder im Code finden. Aktuell geht bei euch von "changeNumberOfCards()" aus eine Kettenreaktion los.   [DONE]
4. Ändert euer Suchformular so dass mit Enter direkt gesucht wird und man nicht extra auf den Button klicken muss. Ihr findet eine Lösung dafür in der ToDo-Liste (https://github.com/HFU-DM-GIS/todo-list-Esistimo/tree/main)  [DONE]
5. Ändert den Code, so dass nicht das reguläre Bild aus dem Suchergebnis verwendet wird, sondern direkt das kleine (small). Da ihr die Bilder eh klein darstellt spart ihr euch hier Datentransfer. 
6. Erweitert eure getNewImage Funktion so, dass diese auch Fehler abfängt, wenn die API nicht genügend oder keine Bilder zurück gibt. (Bilder als Backup) 
7. Schreibt die getNewImage Funktion um, so dass nur einmal ein fetch Aufruf gemacht wird und dann aus dem Ergebnis die nötige Anzahl an Bildern geholt wird.
8. Versucht euch vorher einen Array mit den Zufallszahlen zu füllen, so dass ihr nicht zweimal das selbe Bild verwendet.  [DONE]
9. Aufruf: "ZU ENDE" wenn man alle Karten aufgedeckt hat
10. Timer [DONE]