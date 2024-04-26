const httpRequire = new XMLHttpRequest();
let url = "http://127.0.0.1:3000/api/clinica/pacientes/";

const getAll = () => {
  httpRequire.open("GET", url);
  httpRequire.onload = function () {
  if (httpRequire.readyState === 4 && httpRequire.status === 200) {
    const pacientes = JSON.parse(httpRequire.responseText);
       const tableBody = document.getElementById("bodyTable");
        pacientes.forEach((paciente) => {
          if(paciente[13] === '1'){
            const actionCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.id = "btn-edit"
            editButton.className = "btn btn-warning";
            editButton.innerHTML = '<i class="fa fa-pencil"></i>';
            editButton.addEventListener('click', actualizarPaciente);
            const deleteButton = document.createElement("button");
            deleteButton.id = "btn-delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
            deleteButton.addEventListener('click', deleteRegister);
            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);

            const row = document.createElement("tr");
            const idCell = document.createElement("td");
            idCell.textContent = paciente[0];
            idCell.id = "idPaciente";
            const nombreCell = document.createElement("td");
            nombreCell.textContent = paciente[1];
            const identidadCell = document.createElement("td");
            identidadCell.textContent = paciente[2];
            const telefonoCell = document.createElement("td");
            telefonoCell.textContent = paciente[5];
            const direccionCell = document.createElement("td");
            direccionCell.textContent = paciente[4];
            const creacionCell = document.createElement("td");
            creacionCell.textContent = paciente[9];
            const actualizacionCell = document.createElement("td");
            actualizacionCell.textContent = paciente[10];
            const statusCell = document.createElement("td");
            statusCell.textContent = paciente[13];

            row.appendChild(actionCell);
            row.appendChild(idCell);
            row.appendChild(nombreCell);
            row.appendChild(identidadCell);
            row.appendChild(telefonoCell);
            row.appendChild(direccionCell);
            row.appendChild(creacionCell);
            row.appendChild(actualizacionCell);
            row.appendChild(statusCell);
            tableBody.appendChild(row);
          } 
        });
    } else {
      console.error("Request failed with status:", httpRequire.status);
    }
  };
  httpRequire.send();
};

document.getElementById("btnRegister").addEventListener('click', createPaciente);
function createPaciente(){
  const nombre = document.getElementById("name-paciente-field").value;
  const identidad = document.getElementById("identidad-field").value;
  const edad = document.getElementById("age-field").value;
  const direccion = document.getElementById("direction-field").value;
  const telefono = document.getElementById("phone-field").value;
  const correo = document.getElementById("email-field").value;
  const genero = document.getElementById("genero-field").value;
  const typeBlood = document.getElementById("tipo-sangre-field").value;
  let trimNombre = nombre;
  let trimIdentidad = identidad;
  let trimEdad = edad;
  let trimDireccion = direccion;
  let trimTelefono = telefono;
  let trimCorreo = correo;
  let trimGenero = genero;
  let trimTipoSangre = typeBlood;

  if(trimNombre === "" || trimIdentidad === "" || trimEdad === "" || trimDireccion === "" || trimTelefono === "" || trimCorreo === "" || trimGenero === "" || trimTipoSangre === "" )  {
    swal("Error", "Debe completar los campos del formulario", "error");
    return;
  };

  document.getElementById("name-paciente-field").value = "";
  document.getElementById("identidad-field").value = "";
  document.getElementById("age-field").value = "";
  document.getElementById("direction-field").value = "";
  document.getElementById("phone-field").value = "";
  document.getElementById("email-field").value = "";
  document.getElementById("tipo-sangre-field").value = "";
  const nuevoPaciente = JSON.stringify({
    paciente_nombre : nombre, 
    paciente_identidad : identidad,
    paciente_edad : edad, 
    paciente_direccion : direccion, 
    paciente_telefono : telefono, 
    paciente_correo : correo, 
    paciente_genero : genero,
    paciente_tipo_sangre : typeBlood,
  });
  httpRequire.open("POST", url);
  httpRequire.setRequestHeader("Content-Type", "application/json; charset=UTF-8" );
  httpRequire.onload = function(){
    if(httpRequire.readyState === 4 && httpRequire.status === 200){
      console.log(JSON.parse(httpRequire.responseText));
      const body = document.getElementById("bodyTable");
      while(body.firstChild){
        body.removeChild(body.firstChild);
      }
      getAll();
    }else{
      console.error("Error al crear medicamento: ", httpRequire.status);
    }
  }
  httpRequire.onerror = function () {
    console.error("Error en la solicitud POST.");
  };
  httpRequire.send(nuevoPaciente);
};

var myModal = new bootstrap.Modal(document.getElementById('ventana'));
function actualizarPaciente(){
  myModal.show();
  const row = event.target.closest('tr');
  let idPaciente = row.querySelector('#idPaciente').textContent;
  let urlGet = `http://127.0.0.1:3000/api/clinica/pacientes/${idPaciente}`;
  const getPaciente = () => {
    httpRequire.open("GET", urlGet);
    httpRequire.onload = function(){
      if(httpRequire.readyState === 4 && httpRequire.status === 200){
        const paciente = JSON.parse(httpRequire.responseText);
        const id = document.getElementById("paciente_id");
        const nombre = document.getElementById("uptName");
        const identidad = document.getElementById("uptIdent");
        const edad = document.getElementById("uptEdad");
        const direccion = document.getElementById("uptDireccion");
        const telefono = document.getElementById("uptTelefono");
        const correo = document.getElementById("uptEmail");
        const genero = document.getElementById("uptGenero");
        const typeBlood = document.getElementById("uptTipoSangre");
        if(paciente.length > 0){
          id.value = paciente[0];
          nombre.value = paciente[1];
          identidad.value = paciente[2];
          edad.value = paciente[3];
          direccion.value = paciente[4];
          telefono.value = paciente[5];
          correo.value = paciente[6];
          genero.value = paciente[7];
          typeBlood.value = paciente[8];
        }
      }
    }
    httpRequire.send();
  }
  getPaciente();
}

document.getElementById('botonEditar').addEventListener('click', updatePaciente);
function updatePaciente(){
  const id = document.getElementById("paciente_id").value;
  const nombre = document.getElementById("uptName").value;
  const identidad = document.getElementById("uptIdent").value;
  const edad = document.getElementById("uptEdad").value;
  const direccion = document.getElementById("uptDireccion").value;
  const telefono = document.getElementById("uptTelefono").value;
  const correo = document.getElementById("uptEmail").value;
  const genero = document.getElementById("uptGenero").value;
  const typeBlood = document.getElementById("uptTipoSangre").value;

  const paciente = JSON.stringify({
    paciente_nombre: nombre, 
    paciente_identidad: identidad, 
    paciente_edad: edad, 
    paciente_direccion: direccion, 
    paciente_telefono: telefono, 
    paciente_correo: correo, 
    paciente_genero: genero,
    paciente_tipo_sangre: typeBlood, 
    paciente_id: id
  });
  httpRequire.open("PUT", url);
  httpRequire.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  httpRequire.onload = function (){
    if(httpRequire.readyState === 4 && httpRequire.status === 200){
      const body = document.getElementById("bodyTable");
      while(body.firstChild){
        body.removeChild(body.firstChild);
      }
      getAll();
      location.reload();
    }else{
      console.error("Error al modificar paciente: ", httpRequire.status);
    }
  };
  httpRequire.onerror = function () {
    console.error("Error en la solicitud PUT.");
  };
  httpRequire.send(paciente);
}

function deleteRegister(){
  const row = event.target.closest('tr');
  let idPaciente = row.querySelector('#idPaciente').textContent;
  swal({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará el registro permanentemente.",
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if(willDelete){
      let urlDelete = `http://127.0.0.1:3000/api/clinica/pacientes/${idPaciente}`;
      httpRequire.open("DELETE", urlDelete);
      httpRequire.onload = function () {
        if(httpRequire.readyState === 4 && httpRequire.status === 200){
          const body = document.getElementById("bodyTable");
          while (body.firstChild) {
            body.removeChild(body.firstChild);
          }
          getAll();
          }else{
            console.error("Error al borrar la especialidad:", httpRequire.status);
          };
        };
      httpRequire.send();
    }else{
      swal("Cancelado", "El registro no ha sido eliminado.", "info");
    }
  });
}
getAll();