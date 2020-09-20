/**
Meant to act as a menu system where the user
can choose which game they want to play. Is
basically just a menu UI written in main.
**/

#include "blackjack.c"

int main(int argc, int* argv[]){
  //declare an array of 52 cards
  Card deck[MAX_CARDS] = {"",0,""};
  //declare a stack to put the deck on
  Stack s[MAX_CARDS];
  Card yourHand[10];
  Card dealerHand[10];
  initialize(deck);
  // printf("default deck\n");
  // display(deck);
  shuffle(deck, s);
  // printf("shuffled deck\n");
  //  display(deck);
  dealer(deck, s, yourHand, dealerHand);
  return 0;
}
