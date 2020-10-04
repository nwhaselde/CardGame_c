/**********************************************************
* Recursion.java -  please create a single file named 
* Recursion.java where you will include recursive methods.
* In addition, you are expected to provide a menu that allows
* the user to select one of two options: printSquare or 
* isBackwards
* 
* Name: Nick Haselden *
* Course: CSCI 150 *
* Homework 06 Recursion.JAVA *
* Email: nwhaselde@coastal.edu *
* *
**********************************************************/
import java.util.Scanner;

public class Recursion {

	public static void printSquares(int n) {
		
		
		System.out.println("Please enter the value of n: ");
		
		
		try{
			if(n<1){
				throw new IllegalArgumentException("n must be greater than 1");
			}
			else {
				if(n==1){
					System.out.print(1);
				}
				else{
					boolean mark=true;

					for(int i=n;i>1;i--){
						if(i%2!=0){
							if(mark==true){
								System.out.print(i*i);
								mark=false;
							}

							else{
								System.out.print(","+i*i);
							}

						}

					}//for loop ends

					System.out.print(",1");

					for(int i=2;i<=n;i++){
						if(i%2==0){
							System.out.print(","+i*i);
						}

					}//for loop ends

				}

			}

			}catch(IllegalArgumentException e){
				System.out.println(e);

		}//end exception catch

		}//end printSquares
	
	public static boolean isBackwards(String first, String second) {
		
		Scanner input = new Scanner(System.in);
		
		boolean result = true;
		  
		System.out.println("Please enter the first word: ");
		first = input.next();
		
		System.out.println("Please enter the second word: ");
		second = input.next();
		
		String str1 = first.replace(" ","");
		String str2 = second.replace(" ","");
		
		if (str1.equals("") && str2.equals(""))
			return true;
			System.out.println("FAIL");
		
			if (str1.length() != str2.length())
				return false;
				System.out.println("GG M8");
		
		for (int i = 0; i<str1.length(); i++){

			if (Character.toLowerCase(str1.charAt(i)) != Character.toLowerCase(str2.charAt(str1.length()-1-i))){

			return false;
			}
		}
		return result;
		  
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner input = new Scanner(System.in);
		
		System.out.println("Welcome to the Recursion.java menu!!!");
		System.out.println("Please type 1 for printSquares, 2 for isBackwards and 3 to exit the program");
		int userInput;
		String first = null, second = null;
		userInput = input.nextInt();
		
		while(userInput < 1 || userInput > 3) {
			System.out.println("Invalid input: Please select a number 1 through 3.");
			
			if(input.hasNextInt())
				userInput=input.nextInt();
				first = input.next();
				second = input.next();
				
		}
		
		switch(userInput) {
		case 1:
			printSquares(userInput);
			break;
			
		case 2:
			isBackwards(first, second);
			break;
			
		case 3:
			System.out.println("Thank you for using our program. Goodbye.");
		}
	}
			
}
