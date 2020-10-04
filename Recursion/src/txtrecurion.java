
public class txtrecurion {

	public static void main(String[] args) {
		
		System.out.println(mystery1(24,7));
		System.out.println(5%17);
	}
		public static int mystery1(int a, int b) {
			if (a < b) {
			return 0;
			}
			else {
			return 1 + mystery1(a - b, b);
			}
			}
	

}
