PrintWriter o1;
PrintWriter o2;

void setup() {
  o1 = createWriter("variabile.txt");
  o2 = createWriter("rezultate.txt");
  for (int i=0; i<30000; i++) {
    float a = random(10);
    float b = random(10);
    o1.println(a+" "+b);
    float c = 2*a+b;
    o2.println(c);
  }
  o1.close();
  o2.close();
  println("Done!");
}
