# Memory game
A simple memory game.

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
1. Fix all bugs mentioned above.
2. Replace the numbers on the cards with images.
3. Let the user change the number of cards to play with.
4. (Optional) Add a timer and save the times to finish in a leaderboard.
5. Add a flipping animation for the cards.
6. Use images that are taken from [the Unsplash API](https://unsplash.com/documentation#get-a-random-photo). Let the user choose a theme (query) and then get enough images for the cards.