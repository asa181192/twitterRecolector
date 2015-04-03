
#include <LiquidCrystal.h>


LiquidCrystal lcd(4, 5, 6, 7, 8 , 9);//Se cambiaron los pines ya que interfieren con la conexion SPI   

int buzzer = A0; 
int ledVerde = 2;
int ledRojo = 3; 
int normal=0;
int ofensivo=0;
void setup(void) {
    Serial.begin(9600);
    
    pinMode(ledVerde,OUTPUT);
    pinMode(ledRojo,OUTPUT);
    pinMode(buzzer,OUTPUT);
  lcd.begin(16, 2);

        lcd.setCursor(0,0);
    lcd.print("NORMALES:   " );
    lcd.setCursor(0,1);
    lcd.print("OFENSIVOS:   ");
}
void loop(void) {
   
    lcd.setCursor(11,0);
    lcd.print(normal);
    lcd.setCursor(11,1);
    lcd.print(ofensivo);
    
    if(Serial.available()){
     
     char led = (char)Serial.read();
     if(led=='0'){
    
        digitalWrite(ledVerde,HIGH);
    
       digitalWrite(buzzer,HIGH);
       delay(100);
       
      
       digitalWrite(ledVerde,LOW);
       digitalWrite(buzzer,LOW);
       normal++;
       
     
     }
       if(led=='1'){
      
       digitalWrite(ledRojo,HIGH);
       
       digitalWrite(buzzer,HIGH);
       delay(100);
       digitalWrite(buzzer,LOW);
       delay(100);
       digitalWrite(buzzer,HIGH);
       delay (100);
       digitalWrite(ledRojo,LOW);
        digitalWrite(buzzer,LOW);
        ofensivo++;
     
      }
    
}//fin lectura serial 
}//fin void
