
/*
java�еİ��൱��aardio�еĿ�,
java�е�package�������aardio����namespace��䶨�����ֿռ䡣

����java��aardioһ��,��Ҫ���(���)�����ֿռ����ļ�������һ�¡�
aardio��libĿ¼�²��ҿ�,��java������¼·��(classpath)��ȥ���Ұ���
jre�ļ��൱��һ������İ�Ŀ¼��Ĭ�ϵ�aardio��"/java/"Ŀ¼�Լ���Ŀ¼�µ�����jar��ӵ�����¼·���С�

�������aardio.sample.HelloworldApp �����,
���Ǿ���Ҫ�������뵽 "/java/aardio/sample/HelloworldApp.class" ���λ�á�
*/
package aardio.sample; //����java��   
import java.io.*; //����Java��   

public class HelloworldApp{   
	static native String aardio(String code); 
	 
	public static String main(String[] args) {   
		System.out.println("Hello this is a simply test"); //����ַ���,�ַ��������������� 
		System.out.println( args[0]  );  
		System.out.println( args[1]  ); 
		return "aardio,���,���Ǹ���ķ���ֵ"; 
	}  
	public String name = "HelloworldApp2";
	public static int static_num = 123;
	public int test(int a) {   
		return a + 123;
	} 
	public String test_aardio() {  
		return aardio("import win;win.msgbox('����Java,������ִ��aardio����');return true;") ; 
	}      
}  