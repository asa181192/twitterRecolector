
 mysql = require ('mysql'); 
 conection = mysql.createConnection (
{
			host:'localhost',
			user:'root',
			password:'asa181192',
			database:'twitter',
			insecureAuth: true

		}
) ; // fin de configuracion 


conection.connect ( function (error){

		if(error){

			throw error ; 
			console.log ("error conectando ");
		}//en caso de que se genere un error 
		else {

			console.log ("conexion correcta") ;
		}

		}// fin de fncion anonima 
);


function insertar (id,nombre,fecha,hora,coment,nivel){

var query = conection.query('INSERT INTO comentarios (idusuario,nombre,fecha,hora,comentario,nivel) values (?,?,?,?,?,?) ;',[id,nombre,fecha,hora,coment,nivel],function (error,resul){

	if(error){
		throw error; 
		console.log("Error");
		
	}else {
		console.log("dato correctamente insertado ");
	}

}//fin de llamada anonima dentro de query

); //fin de variable query 

//conection.end () ;

//return caracter;
}// fin de lectura 



exports.insertar=insertar 
