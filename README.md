Descripción de implementación.

1. Diseño e implementación de algoritmos
	Proyecto de consola node js donde los archivos principales son index.js y matrix.js. 
	index.js es el main y ejecuta la funcionalidad que se encuentra en matrix.js.
	En index tenemos harcodeados algunos ejemplos de matrices pero tú puedes agregar el que gustes siguiendo el siguiente código:
		
		let matrixThree = [
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 10, 11, 12],
			[13, 14, 15, 16]
		  ];

		console.log("<======Third sample matrix 4X4========>");
		console.log("\n");
		for(let i=0;i<matrixThree.length;i++){
			console.log("\t"+matrixThree[i].join("\t"));
		}
		console.log("\n");
		response = functionality.caracol(matrixThree); //FUNCTIONALITY
		console.log("<-Response Array->", response);
		console.log("\n");
		
	Para ejecutar el código debes utilizar node . o npm start, cualquiera funciona y verás el resultado en consola.

2. Arquitectura de sistemas
	
	No tiene mayor complejidad de implementación debido a que es un archivo PNG ubicado en el directorio #2.
	
3. Caso Práctico

	Consta de 2 aplicaciones, un API Rest desarrollada con node, express y sqlite.
	A continuación describo el proyecto api ubicado en el directorio server-node.
	El archivo de base de datos se genera autómaticamente, está ubicado en ./database/index.js, y por default contiene la siguiente información.
	
	*Usuarios
	Email						Password		Perfil
	admin@gmail.com				123				Administrador
	bibliotecario@gmail.com		456				Bibliotecario
	lector@gmail.com			234				Lector
	
	*Libros
	Titulo						Autor			Editorial		NoPaginas		Año
	Los milagros prohibidos		Alexis Ravelo	Siruela			350				1990
	
	*Solicitudes
	--Sin registros--
	
	Para ejecutar el proyecto es necesario escribir npm start en consola y por default toma el puerto 3000.
	
	A continuación describo el proyecto cliente ubicado en el directorio client-react.
	Está desarrollado en react js e implementa react hooks como usestate, useeffect, customhooks (requests api), usecontext y use reducer para el inicio de sesion 
	y acceso a los datos del usuario autecticado.
	
	Utiliza material ui para el tema y css.
	Para correr el proyecto es necesario ejecutar npm start, por default toma el puerto 3001.
	
	Gracias!
	Tony
	
