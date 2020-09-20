/**

**/

#include"poker.h"

void create_stack(Stack *s){
  s->top = 0;
}
int isFull(Stack s){
  return (s.top == MAX_CARDS ? 1 : 0);
}
int isEmpty(Stack s){
  return (s.top == 0 ? 1 : 0);
}
void push(Card e, Stack *s ){
  if(!isFull(*s)){
    s->entry[s->top++] = e;
  }else{
    printf("Error : Stack Overflow\n");
  }
}
void pop(Card *e, Stack *s){
  if(!isEmpty(*s)){
    *e = s->entry[s->top--];
  }else{
    printf("Error : Stack Underflow\n");
  }
}

