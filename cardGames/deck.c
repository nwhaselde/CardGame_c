/*
  Simulates shuffling a deck of cards 
  using structures and typedef 
  by initializing, shuffling, and displaying the card deck
*/

#include "stack.c"

/*
  initialize the deck of cards to string values
  deck: an array of structure cards 
*/
void initialize(Card deck[]){
  int i = 0;
  printf("***Creating Deck***\n");
  for(i=0;i<MAX_CARDS;i++){
    deck[i].rank = ranks[i%MAX_RANKS];
    deck[i].value = (i%MAX_RANKS) + 1;
    if(deck[i].value > 10){
      deck[i].value = 10;
    }
    strncpy(deck[i].suit, suits[i/MAX_RANKS], MAX);
  }
}

/*
  use the pseudo-random number generator to shuffle the cards
  deck: an array of structure cards 
*/
void shuffle(Card deck[], Stack s[]){
  int swapper = 0; //index of card to be swapped
  int i = 0; //counter
  Card temp = {"",0, ""}; //temp holding place for swap
  srand(time(NULL)); //seed the random numbers with current time
  printf("***Shuffling Deck***\n");
  for(i=0;i<MAX_CARDS;i++){
    //generate a pseudo-random number from 0 to 51
    swapper = rand() % MAX_CARDS; 
    //swap current card with da swapper
    temp = deck[i];
    deck[i] = deck[swapper];
    deck[swapper] = temp;
    push(deck[i], s);
  }
  
}

/*
  display the deck of cards
  deck: an array of structure cards 
*/
void display(const Card deck[]){
  int i = 0;
  
  for(i=0;i<MAX_CARDS;i++){
    printf("%s of %s (value=%d)\n",deck[i].rank,deck[i].suit,deck[i].value);
  }

}

/*

*/
