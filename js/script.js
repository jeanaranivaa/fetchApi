const API_URL = "https://api-generator.retool.com/NdMVjm/data"

//Funcion que manda a traer el JSON
async function obtenerPersonas() {
    const res = await fetch(API_URL); //Se hace llamada al endpoint 

    //Pasamos a JSON la respuesta del servidor
    const data = await res.json(); //Esto es un JSON
    
    //Enviamos el JSON que nos manda la API a la función que crea la tabla HTML
    mostrarDatos(data)
    
} 

//La función lleva un parametro "datos" que representa al JSON
function mostrarDatos(datos){
    //Se llama al tbody dentro del elemento con id "tabla"
    const tabla = document.querySelector('#tabla tbody');

    tabla.innerHTML = ''; //Vaciamos el contenido de la tabla                                                                                                                                                                                                                                  ';

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td> 
                <td>${persona.email}</td>
                <td>${persona.edad}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>      
            </tr>
        `
    });
}

//Llamada inicial para que se carguen los datos del servidor
obtenerPersonas();

