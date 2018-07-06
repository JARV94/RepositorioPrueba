var bd;
window.addEventListener("load", iniciar);

function iniciar() {
    zonaDatos = document.getElementById("zonaDatos");
    boton = document.getElementById("grabar");
    boton.addEventListener("click", agregarObjeto);
    var solicitud = indexedDB.open("miBase", 1); //crear base de datos
    solicitud.onsuccess = function (e) {
        bd = e.target.result; //guardar base de datos en una variable
    }
    solicitud.onupgradeneeded = function () {
        bd = e.target.result; //guardar base en una variable
        bd.createObjectStore("pelicula", {
            keyPath: "clave"
        }); //crear "Tablas/almacenes"

    }

}




function agregarObjeto() {
    var clave = document.getElementById("clave").value;
    var titulo = document.getElementById("texto").value;
    var clave = document.getElementById("fecha").value;
    var transaccion = bd.transaction(["pelicula"], "readwrite") //creando una transaccion
    var almacen = transaccion.objectStore("pelicula"); //crear una tupla
    var agregar = almacen.add({
        clave: clave,
        titulo: titulo,
        fecha: fecha
    }); //agregando los valores a la tupla
    agregar.addEventListener("success", mostrar, false);

}

function mostrar() {
    var zonaDatos = document.getElementById("zonaDatos");
    zonaDatos.innerHTML = ""; //limpiar
    var transaccion = bd.transaction(["pelicula"], "readonly"); //crear transaccion de solo lectura
    var almacen = transaccion.objectStore("pelicula"); //eleccion de tabla a realizarse la transaccion
    var cursor = almacen.openCursor();
    cursor.addEventListener("success", mostrarDatos, false);

}

function mostrarDatos(e) {
    var cursor = e.target.result;
    if (cursor) {
        zonaDatos.innerHTML += "<div>" + cursor.value.clave + "-" + cursor.value.titulo + "-" + cursor.value.fecha + "</div";
        cursor.continue();
    }
}