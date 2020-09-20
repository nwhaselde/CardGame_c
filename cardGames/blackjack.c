/**
blackjack.c - simple game of blackjack. whoever's
cards come the closest to ==21 without going over 
wins.
**/

#include "deck.c"

/**

**/
void dealer(Card deck[], Stack s[], Card yourHand[], Card dealerHand[]){
  int playerCount, i, j, k, yourScore, dealerScore;
  char choice;
  yourHand[MAX_CARDS];
  dealerHand[MAX_CARDS];

  printf("This game is just between you and the dealer.\n");
  //deal cards to both players
  printf("Dealing Cards......\n");
  j=0;
  k=0;
  for(i=0;i<4;i++){
    if(i%2==0){
      yourHand[j] = s->entry[s->top-1];
      pop(deck, s);
      j++;
    }else{
      dealerHand[k] = s->entry[s->top-1];
      pop(deck, s);
      k++;
    }
  }
  printf("Your Cards:\n");
  for(j=0;j<2;j++){
    printf("%s of %s\n",yourHand[j].rank, yourHand[j].suit);
  }
  printf("Dealer flips his top card to reveal he has the...\n");
  printf("%s of %s\n", dealerHand[1].rank, dealerHand[1].suit);

  //aces high or low?? NOT WORKING YET
  char highlow[4];
  for(i=0; i<2; i++){
    if(yourHand[i].value == 1){
      printf("do you want the %s of %s to go high or low?\n",
	     yourHand[i].rank, yourHand[i].suit);
      scanf("%s", highlow);
      if(highlow == "high"){
	yourHand[i].value = 11;
      }else if(highlow == "low"){
	yourHand[i].value = 1;
      }
    }
  }

  yourScore = yourHand[0].value + yourHand[1].value;
  dealerScore = dealerHand[0].value + dealerHand[1].value;

  int counter = 1;
  while(choice != 'n'){
    printf("i=%d\n", counter);
    printf("Do you want another card? y/n\n");
    scanf("%s", &choice);
    if(choice == 'y'){
      counter = counter + 1;
      yourHand[counter] = s->entry[s->top-1];
      pop(deck, s);
      printf("Your New Card:\n");
      printf("%s of %s\n", yourHand[counter].rank, yourHand[counter].suit);
      yourScore = yourScore + yourHand[counter].value;
    }else if(choice == 'n'){
      printf("player says he'll stay\n");
      printf("your score: %d\ndealer score: %d\n",yourScore, dealerScore);
      break;
    }else{
      printf("ERROR: invalid response\n");
    }
  }//end while

  counter = 1;
  while(dealerScore<17){
    printf("%d\n", counter);
    counter = counter + 1;
    printf("dealer wants a hit...\n");
    dealerHand[counter] = s->entry[s->top-1];
    pop(deck, s);
    printf("Dealer's new card:\n");
    printf("%s of %s\n", dealerHand[counter].rank, dealerHand[counter].suit);
    if(dealerHand[counter].value == 1 && dealerScore < 11){
      dealerHand[counter].value = 11;
    }
    dealerScore = dealerScore + dealerHand[counter].value;
  } printf("Dealer Stays...\n");


  //determining a winner
  printf("Your Final Score: %d\n", yourScore);
  printf("Dealer's Final Score: %d\n", dealerScore);
  if(yourScore > dealerScore && yourScore < 22){
    printf("***You Win***\n");
  }else if(yourScore==dealerScore && yourScore<22 && dealerScore<22){
    printf("***Draw***\n");
  }else if(dealerScore > yourScore && dealerScore<22){
    printf("***House Wins***\n");
  }
  if(yourScore > 21 && dealerScore < 22){
    printf("***You Busted***\n");
    printf("***House Wins***\n");
  }
  if(dealerScore > 21 && yourScore < 22){
    printf("***House Busted***\n");
    printf("*****You Win!*****\n");
  }
  if(dealerScore>21 && yourScore>21){
    printf("***You Both Busted***\n");
    printf("********Draw*********\n");
  }
  //check yours and dealers full hand
  printf("Your full hand values\n");
  for(i=0; i<10; i++){
    printf("%d\n", yourHand[i].value);
  }
  printf("Dealer's full hand values\n");
  for(i=0; i<10; i++){
    printf("%d\n", dealerHand[i].value);
  }
}
