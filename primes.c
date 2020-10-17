/*


*/

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int* ptr;
char* num;
char* num1;
char* num2;
char* epn;

int i,j,k,l1,l2,tmp,counter,totalPrimes;

int * primes();
void EuclidsNumber();

int main(){
  ptr=(int*)calloc(111125, sizeof(int));
  num = (char*)malloc(2000 * sizeof(char));
  num1 = (char*)malloc(1000 * sizeof(char));
  num2 = (char*)malloc(1000 * sizeof(char));
  epn = (char*)malloc(2000 * sizeof(char));
 
  primes();
  
  sprintf(&num1[0], "%d", ptr[0]);
  printf("%s\n", &num1[0]);

  sprintf(&num2[0],"%d", ptr[1]);
  printf("%s\n", &num2[0]);

  
  // EuclidsNumber();

}//end main

/**
Funtion that calculates every prime number starting from 
2 and ending at any nth number you choose. this funtion 
prints each prime as soon as it's found but also copys 
the new prime numberdown into an array, which is returned 
at the end.
**/
int * primes(){
    printf("calculating prime numbers 1-n\n");
    //calculate prime numbers
    for(i=2;i<500000;i++){
      if(i==2){
	  ptr[i-(j+i)]=i;
	  totalPrimes = 1;
      }else{
	  counter=0;
	  for(j=0;j<totalPrimes; j++){
	    if(i%ptr[i+(j-i)]==0){
	      counter = -1;
	      break;
	    }else{
	      counter++;
	    }
	  }//end nested for loop
	  if(counter == totalPrimes ){
	    ptr[totalPrimes] = i;
	    totalPrimes++;
	  }	  
      }  
    }//end for loop
    
    //print the array
    printf("***List of Prime Numbers***\n");
    for(i=0;i<totalPrimes;i++){
      printf("%d\n", ptr[i]);
    }
    //print total primes currently in array
    printf("totalPrimes = %d\n", totalPrimes);

    FILE *f=fopen("primes.txt","w");

    for(i=0;i<totalPrimes;i++){
      fprintf(f, "%d ", ptr[i]);
    }

    fclose(f);
    return ptr;
}//end primes

/**
The calculation of the union of all prime numbers (found so far)
plus 1. As Euclid's classic proof of infinite prime numbers 
showed, this calculation will always return a prime number.
The number gets large fairly quickly so I'll need to figure out 
a way to print the potentially hundreds of digits as a string 
instead of an int.
**/
void EuclidsNumber(){

  
  //euclid's prime number..the union of all primes calculated so far +1.
  //number gets too big. need to figure out a way to make a string
  for(i=0;i<8;i++){
    sprintf(num,"%d",ptr[i]);
  }
  for(i=0;i<8;i++){
    j=0;
    k=0;
    if(i%2==0){
      num1[j]=num[i];
      j++;
    }else{
      num2[k]=num[i];
      k++;
    }
  }
  //print test
  printf("primes converted to strings: \n");
  for(i=0;i<8;i++){
    printf("%d \n", num[i]);
  }
  printf("num1 list\n");
  for(i=0; i<5;i++){
    printf("%d \n", num1[i]);
  }
  printf("num2 list\n");
  for(i=0;i<5;i++){
    printf("%d \n", num2[i]);
  }
}
