#pragma once
#include <stdio.h>
#include <time.h> //time function
#include <stdlib.h> //random number generator functions
#include <string.h>
#define MAX 10
#define MAX_CARDS 52
#define MAX_RANKS 13
#define MAX_SUITS 4

//array of pointers to strings for ranks
char *ranks[MAX_RANKS] = {"Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"};

//two-dimensional array of strings for suits
char suits[MAX_SUITS][MAX] = {"Clubs", "Diamonds", "Hearts", "Spades"};


//structure definition
struct card{ 
  char *rank;
  int value;
  char suit[MAX];  
};
typedef struct card Card;

typedef struct Stack{
  int top;
  Card entry[MAX];
}Stack;

//blackjack function declarations
void dealer(Card [], Stack [], Card [], Card []);
//deck function declarations
void initialize(Card []);
void shuffle(Card [], Stack []);
void display(const Card[]);
//stack function declarations
void create_stack(Stack *s);
int isFull(Stack s);
int isEmpty(Stack s);
void push(Card e ,Stack *s);
void pop(Card *e, Stack *s);
