firebase.initializeApp({
  apiKey: "AIzaSyDMdWcTPaQ4eA3GIDEsCD_zY7H4BL51t_k",
    authDomain: "practica-e521c.firebaseapp.com",
    databaseURL: "https://practica-e521c.firebaseio.com",
    projectId: "practica-e521c",
    storageBucket: "practica-e521c.appspot.com",
    messagingSenderId: "330985846692"
});


var db = firebase.firestore();

function guardar() {

    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;

    db.collection("practica").add({
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    })
        .then(function (docRef) {
            console.log("se guardo el id: ", docRef.id);
            var nombre = document.getElementById('nombre').value = '';
            var descripcion = document.getElementById('descripcion').value = '';
            var precio = document.getElementById('precio').value = '';
        })
        .catch(function (error) {
            console.error("Error al guardar: ", error);
        });
  
}


var tabla = document.getElementById('tabla');

db.collection("practica").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {

        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `        
        <tr>
        
        <td>${doc.data().nombre}</td>
        <td>${doc.data().descripcion}</td> 
        <td>${doc.data().precio}</td>       
        <td><button class="btn btn-info" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().descripcion}','${doc.data().precio}')">Editar</button></td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        </tr>  
        ` 
    });
});
 
function editar(id, nombre, descripcion, precio) {    

    document.getElementById("nombre").value = nombre;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("precio").value = precio;
    

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {

        var prodRef = db.collection("practica").doc(id);

        var nombre = document.getElementById("nombre").value;
        var descripcion = document.getElementById("descripcion").value;
        var precio = document.getElementById("precio").value;


        return prodRef.update({
            nombre: nombre,
            descripcion: descripcion,
            precio: precio
        })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Guardar';
                var nombre = document.getElementById('nombre').value = '';
                var descripcion = document.getElementById('descripcion').value = '';
                var precio = document.getElementById('precio').value = '';
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            });
        
    }
}


function eliminar(id) {

    db.collection("practica").doc(id).delete().then(function () {
        console.log("Usuario Eliminado");
    }).catch(function (error) {
        console.error("Error al eliminarlo ", error);
    });
}
