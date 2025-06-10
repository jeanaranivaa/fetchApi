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
                    <button onclick="AbrirModalEditar(${persona.id}, '${persona.nombre}', '${persona.apellido}', '${persona.email}', '${persona.edad}' )">Editar</button>
                    <button onClick="EliminarPersona(${persona.id})">Eliminar</button>
                </td>      
            </tr>
        `
    });
}

//Llamada inicial para que se carguen los datos del servidor
obtenerPersonas();


/*Agregar un nuevo registro*/
const modal = document.getElementById("modal-agregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", () => {
    modal.showModal();
});

btnCerrar.addEventListener("click", () =>{
    modal.close();
})

document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); // "e" representa "submit" - Evita que el formulario se envie de golpe

    //Capturar los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    //Validacion básica
    if(!nombre || !apellido || !email || !edad){
        alert("Complete todos los campos");
        return; //Evitar que el formulaario se envíe
    } 

    //Llamar a la API
    const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, apellido, email, edad})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario y cerrar el modal
        document.getElementById("frmAgregar").reset();

        modal.close();

        //Recargar la tabla
        obtenerPersonas();
    }
    else{
        alert("Hubo un error al agregar");
    }


});

//Funcion para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Estás seguro que deseas borrar el registro?");

    //Validamos si el usuario dijo que sí
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {method: "DELETE"});

        //Recargamos la tabla para ver la eliminación
        obtenerPersonas();
    }
}

//Proceso para editar un registro
const modalEditar = document.getElementById("modal-editar");
const btnCerrarModal = document.getElementById("btnCerrarEditar");

btnCerrarModal.addEventListener("click", () =>{
    modalEditar.close();
})

function AbrirModalEditar (id, nombre, apellido, email, edad){
    document.getElementById("idEditar").value = id;
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("emailEditar").value = email;
    document.getElementById("edadEditar").value = edad;

    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", async e=>{
    e.preventDefault();

    const id = document.getElementById("idEditar").value;
    const nombre = document.getElementById("nombreEditar").value.trim();
    const apellido = document.getElementById("apellidoEditar").value.trim();
    const email = document.getElementById("emailEditar").value.trim();
    const edad = document.getElementById("edadEditar").value.trim();

    if(!id || !nombre || !apellido || !email || !edad){
        alert("Complete todos los campos");
        return;
    }

    //Llamada a la API
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({edad, email, nombre, apellido})
    });

    if (respuesta.ok){
        alert("Registro actualizado con exito");
        modalEditar.close();
        obtenerPersonas();
    }
    else{
        alert("Hubo un error al actualizar");
    }

 });

