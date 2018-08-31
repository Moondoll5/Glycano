import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Embed {

    public static void main(String[] args) {
        //Runtime runtime = Runtime.getRuntime();
        try {
            //Process process = runtime.exec("C:\\Users\\naziedoll\\Documents\\NetBeansProjects\\Embed\\CarbBuilder2.exe", null, new File("C:\\Users\\naziedoll\\Documents\\NetBeansProjects\\Embed"));
            
//            Desktop d = Desktop.getDesktop();
//            d.open(new File("C:\\Users\\naziedoll\\Documents\\NetBeansProjects\\Embed\\CarbBuilder2.exe"));


            Process process = new ProcessBuilder("C:\\Users\\naziedoll\\Documents\\Honours\\FirebaseWeb\\public\\files\\jsmol\\CBv2.1.25\\CarbBuilder2.exe","-i", "\"->2)aLRha(1->2)aLRha(1->3)aLRha(1->3)bDGlcNAc(1->\"", "-r", "6", "-o", "outputtie").start();
            
            InputStream is = process.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader br = new BufferedReader(isr);
            String line;

            while ((line = br.readLine()) != null) {
              System.out.println(line);
            }
        } catch (Exception e) {
        }
    }
    
}