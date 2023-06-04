




// Arreglo para almacenar las publicaciones
var publicaciones = [];

// Función para mostrar las publicaciones en la página
function mostrarPublicaciones() {
  var publicacionesContainer = document.getElementById('publicaciones-container');
  publicacionesContainer.innerHTML = '';

  for (var i = publicaciones.length - 1; i >= 0; i--) { // Iterar en orden inverso
    var publicacion = publicaciones[i];

    var publicacionElement = document.createElement('div');
    publicacionElement.classList.add('publicacion');

    var nombreUsuarioElement = document.createElement('h4');
    nombreUsuarioElement.textContent = publicacion.nombreUsuario.toUpperCase(); // Convertir a mayúsculas
    publicacionElement.appendChild(nombreUsuarioElement);

    var descripcionElement = document.createElement('p');
    descripcionElement.textContent = publicacion.descripcion;
    publicacionElement.appendChild(descripcionElement);

    if (publicacion.tipo === 'foto') {
      var imagenContainer = document.createElement('div');
      imagenContainer.classList.add('imagen');

      var imagenElement = document.createElement('img');
      imagenElement.src = publicacion.imagen;
      imagenElement.alt = publicacion.nombreUsuario;
      imagenContainer.appendChild(imagenElement);

      var eliminarElement = document.createElement('button');
      eliminarElement.textContent = 'Eliminar';
      eliminarElement.classList.add('eliminar');
      eliminarElement.onclick = eliminarPublicacion(i);
      imagenContainer.appendChild(eliminarElement);
		

      publicacionElement.appendChild(imagenContainer);
    }

    publicacionesContainer.appendChild(publicacionElement);
  }
}

// Función para guardar las publicaciones en el almacenamiento local
function guardarPublicaciones() {
  localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
}

// Función para cargar las publicaciones desde el almacenamiento local
function cargarPublicaciones() {
  var publicacionesGuardadas = localStorage.getItem('publicaciones');
  if (publicacionesGuardadas) {
    publicaciones = JSON.parse(publicacionesGuardadas);
    mostrarPublicaciones();
  }
}

// Llama a la función cargarPublicaciones al cargar la página
window.addEventListener('load', cargarPublicaciones);

// Función para publicar una foto
function publicarFoto() {
  var nombreUsuarioInput = document.getElementById('nombre-usuario-foto');
  var descripcionInput = document.getElementById('descripcion-foto');
  var imagenInput = document.getElementById('imagen-foto');

  var nombreUsuario = nombreUsuarioInput.value.toUpperCase(); // Convertir a mayúsculas
  var descripcion = descripcionInput.value;
  var imagen = '';

  // Verificar que se haya seleccionado una imagen
  if (imagenInput.files && imagenInput.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      imagen = e.target.result;

      // Crear objeto de la publicación y agregarlo al arreglo
      var publicacion = {
        tipo: 'foto',
        nombreUsuario: nombreUsuario,
        descripcion: descripcion,
        imagen: imagen
      };
      publicaciones.push(publicacion);

		
		
		
      // Mostrar las publicaciones actualizadas
      mostrarPublicaciones();

      // Guardar las publicaciones en el almacenamiento local
      guardarPublicaciones();

      // Restaurar los campos de texto
      nombreUsuarioInput.value = '';
      descripcionInput.value = '';
      imagenInput.value = '';

      // Restablecer el campo de texto del formulario
      descripcionInput.value = '';
    };

    reader.readAsDataURL(imagenInput.files[0]);
  }
}

// Función para eliminar una publicación
function eliminarPublicacion(index) {
  return function() {
    publicaciones.splice(index, 1);
    mostrarPublicaciones();
    guardarPublicaciones();
  }
}


