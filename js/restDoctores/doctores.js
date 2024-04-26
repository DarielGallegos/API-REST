const httpRequire = new XMLHttpRequest();
let url = "http://127.0.0.1:3000/api/clinica/doctores/";

const getAll = () => {
  httpRequire.open("GET", url);
  httpRequire.onload = function () {
  if (httpRequire.readyState === 4 && httpRequire.status === 200) {
    const doctores = JSON.parse(httpRequire.responseText);
    const tableBody = document.getElementById("bodyTable");    
    doctores.forEach((doctor) => {
      if(doctor[11] === '1'){
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.id = "btn-edit"
        editButton.className = "btn btn-warning";
        editButton.innerHTML = '<i class="fa fa-pencil"></i>';
        editButton.addEventListener('click', actualizarDoctor);
        const deleteButton = document.createElement("button");
        deleteButton.id = "btn-delete";
        deleteButton.className = "btn btn-danger";
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.addEventListener('click', deleteRegister);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = doctor[0];
        idCell.id = "idDoctor";
        const nombreCell = document.createElement("td");
        nombreCell.textContent = doctor[1];
        const identCell = document.createElement("td");
        identCell.textContent = doctor[2];
        const telefonoCell = document.createElement("td");
        telefonoCell.textContent = doctor[5];
        const direccionCell = document.createElement("td");
        direccionCell.textContent = doctor[3];
        const creacionCell = document.createElement("td");
        creacionCell.textContent = doctor[7];
        const actualizacionCell = document.createElement("td");
        actualizacionCell.textContent = doctor[8];
        const statusCell = document.createElement("td");
        statusCell.textContent = doctor[11];
        row.appendChild(actionCell);
        row.appendChild(idCell);
        row.appendChild(nombreCell);
        row.appendChild(identCell);
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
  let nombre = document.getElementById("name-doctor-field").value;
  let identidad = document.getElementById("identidad-field").value;
  let direccion = document.getElementById("direction-field").value;
  let especialidad = document.getElementById("especialidad-field").value;
  let telefono = document.getElementById("phone-field").value;
  let correo = document.getElementById("email-field").value;

  let trimNombre = nombre;
  let trimIdentidad = identidad;
  let trimDireccion = direccion;
  let trimEspecialidad = especialidad;
  let trimTelefono = telefono;
  let trimCorreo = correo;
if(trimNombre === "" || trimIdentidad === "" || trimDireccion === "" || trimEspecialidad === "" || trimTelefono === "" || trimCorreo === ""){
  swal("Error", "Debe completar los campos del formulario", "error");
  return;
}


  document.getElementById("name-doctor-field").value = "";
  document.getElementById("identidad-field").value = "";
  document.getElementById("direction-field").value = "";
  document.getElementById("especialidad-field").value = "";
  document.getElementById("phone-field").value = "";
  document.getElementById("email-field").value = "";

  const newDoctor = JSON.stringify({
    doctor_nombre : nombre, 
    doctor_identidad : identidad, 
    doctor_direccion : direccion, 
    especialidad_id : especialidad, 
    doctor_telefono : telefono, 
    doctor_correo : correo,
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
  httpRequire.send(newDoctor);
};

var myModal = new bootstrap.Modal(document.getElementById('ventana'));
function actualizarDoctor(){
  myModal.show();
  const row = event.target.closest('tr');
  let idDoctor = row.querySelector('#idDoctor').textContent;
  let urlGet = `http://127.0.0.1:3000/api/clinica/doctores/${idDoctor}`;
  const getDoctor = () => {
    httpRequire.open("GET", urlGet);
    httpRequire.onload = function(){
      if(httpRequire.readyState === 4 && httpRequire.status === 200){
        const doctor = JSON.parse(httpRequire.responseText);
        const doctorId = document.getElementById("doctor_id");
        const nameField = document.getElementById("uptName");
        const identField = document.getElementById("uptIdent");
        const direcField = document.getElementById("uptDireccion");
        const especField = document.getElementById("uptEspecialidad");
        const telField = document.getElementById("uptTelefono");
        const emailField = document.getElementById("uptEmail");
        if(doctor.length > 0){
          doctorId.value = doctor[0];
          nameField.value = doctor[1];
          identField.value = doctor[2];
          direcField.value = doctor[3];
          especField.value = doctor[4];
          telField.value = doctor[5];
          emailField.value = doctor[6];
        }
      }
    }
    httpRequire.send();
  }
  getDoctor();
}

document.getElementById('botonEditar').addEventListener('click', updateDoctor);
function updateDoctor(){
  const doctorId = document.getElementById("doctor_id").value;
  const nameField = document.getElementById("uptName").value;
  const identField = document.getElementById("uptIdent").value;
  const direcField = document.getElementById("uptDireccion").value;
  const especField = document.getElementById("uptEspecialidad").value;
  const telField = document.getElementById("uptTelefono").value;
  const emailField = document.getElementById("uptEmail").value;

  const doctor = JSON.stringify({
    doctor_nombre: nameField, 
    doctor_identidad: identField, 
    doctor_direccion: direcField, 
    especialidad_id: especField, 
    doctor_telefono: telField, 
    doctor_correo: emailField, 
    doctor_id: doctorId,
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
      console.error("Error al modificar doctor: ", httpRequire.status);
    }
  };
  httpRequire.onerror = function () {
    console.error("Error en la solicitud PUT.");
  };
  httpRequire.send(doctor);
}

function deleteRegister(){
  const row = event.target.closest('tr');
  let idDoctor = row.querySelector('#idDoctor').textContent;
  swal({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará el registro permanentemente.",
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if(willDelete){
      let urlDelete = `http://127.0.0.1:3000/api/clinica/doctores/${idDoctor}`;
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