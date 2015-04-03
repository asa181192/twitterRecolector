var express = require('express');
var twitter = require ('ntwitter') ;
var mysql = require('./mysql.js') ;
var app = express () ; 
app.listen(3000);


// Requerimos el módulo serialport
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

// Instanciamos el objeto de conexión al puerto serial
/*
var sp = new SerialPort('COM10', {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")

},false);
*/


var palabrasOfensiva= ['maldito','imbecil','estupido','pendejo','culero','cabron','puto','putas','puta','mierda','chingada','mames','joto','marica','wey','zorra','verga','cagon','pendejos','pinche','vale madre','mamadas'] ;
var twit = new twitter({
  consumer_key: 'TD3KeqiXUTyghlbgYvQO0BiJj',
  consumer_secret: 'PHrmLVJSCYqYsY4sKezVSodrnCmd2FIJCaQM1BAkj2fBbh8mCp',
  access_token_key: '399056836-MHPoCcaIDAjnEbQKMFsBnhWEX9RfWJGebcGPb3Oq',
  access_token_secret: '3Zjxo1swPjNQ9TdwmYjN96mLka9QYTaHKUHTyN89e8WBp'
});


  //sp.open(function () {


  count = 0 ;
console.log("Empezando recoleccion de TWEETS ");
twit.stream('statuses/filter', {'locations':'-100.75,24.8,-99.75,25.8'}, function(stream) {
  stream.on('data', function (data) {

    if(count<100){

      var f = new Date(); // obtener la fecha actual para ser registrda en la tabla asistencia 
      var fecha=  f.getFullYear() + "/" + (f.getMonth() +1) + "/"+  f.getDate() ;
      var h = new Date(); 
      var hora = h.getHours()+":"+ h.getMinutes() +":"+h.getSeconds() ; 
      var nombre= data.user.name.toString();
      var coment =  data.text.toString() ; 
      var id = parseInt(data.id);
         console.log("NOMBRE :"+nombre+ "\nTWEET : "+coment+"\nID : "+id+"\nFECHA :"+fecha+" HORA : "+hora+"\n");



         for (var i = 0; i<palabrasOfensiva.length ; i++) {

            var n = coment.match(palabrasOfensiva[i]);

            if(n!=null){
               mysql.insertar(id,nombre,fecha,hora,coment,'ofensiva');
              // sp.write('1');
               
            }

              else if(i==21) {
                 mysql.insertar(id,nombre,fecha,hora,coment,'normal');
                 //sp.write('0');
          }

          };

         
         count ++;


                }

      else {

        stream.destroy();
        console.log("TERMINARON LOS TWEETS ");
      }
     
  });

});



//});


