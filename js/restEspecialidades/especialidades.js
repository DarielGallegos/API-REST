const httpRequire = new XMLHttpRequest();
let url = "http://127.0.0.1:3000/api/clinica/especialidades/";

const getAll = () => {
  httpRequire.open("GET", url);
  httpRequire.onload = function () {
  if (httpRequire.readyState === 4 && httpRequire.status === 200) {
    const especialidades = JSON.parse(httpRequire.responseText);
       const tableBody = document.getElementById("bodyTable");
        especialidades.forEach((especialidad) => {
          if(especialidad[6] === '1'){

            const actionCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.id = "btn-edit"
            editButton.className = "btn btn-warning";
            editButton.innerHTML = '<i class="fa fa-pencil"></i>';
            editButton.addEventListener('click', actualizarEspecialidad);
            const deleteButton = document.createElement("button");
            deleteButton.id = "btn-delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
            deleteButton.addEventListener('click', deleteRegister);
            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);

            const row = document.createElement("tr");
            const idCell = document.createElement("td");
            idCell.id = "idEspecialidad";
            idCell.textContent = especialidad[0];
            const nombreCell = document.createElement("td");
            nombreCell.textContent = especialidad[1];
            const creacionCell = document.createElement("td");
            creacionCell.textContent = especialidad[2];
            const actualizacionCell = document.createElement("td");
            actualizacionCell.textContent = especialidad[3];
            const cByCell = document.createElement("td");
            cByCell.textContent = especialidad[4];
            const uByCell = document.createElement("td");
            uByCell.textContent = especialidad[5];
            const statusCell = document.createElement("td");
            statusCell.textContent = especialidad[6];

            row.appendChild(actionCell)
            row.appendChild(idCell);
            row.appendChild(nombreCell);
            row.appendChild(creacionCell);
            row.appendChild(actualizacionCell);
            row.appendChild(cByCell);
            row.appendChild(uByCell);
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

document.getElementById("btnRegister").addEventListener('click', createEspecialidad);
function createEspecialidad(){
  let nameEspecialidad = document.getElementById("name-especialidad-field").value;
  let trimEspecialidad = nameEspecialidad.trim();

  if(trimEspecialidad === ""){
    swal("Error", "Debe completar los campos del formulario", "error");
    return;
  }

  document.getElementById("name-especialidad-field").value = "";
  
  const nuevaEspecialidad = JSON.stringify({
    especialidad_nombre : trimEspecialidad,
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
  httpRequire.send(nuevaEspecialidad);
}

var myModal = new bootstrap.Modal(document.getElementById('ventana'));
function actualizarEspecialidad(){
  myModal.show();
  const row = event.target.closest('tr');
  let idEspecialidad = row.querySelector('#idEspecialidad').textContent;
  let urlGet = `http://127.0.0.1:3000/api/clinica/especialidades/${idEspecialidad}`;
  const getEspecialidad = () => {
    httpRequire.open("GET", urlGet);
    httpRequire.onload = function (){
      if(httpRequire.readyState === 4 && httpRequire.status === 200){
        const especialidadArray = JSON.parse(httpRequire.responseText);
        const nameField = document.getElementById("actualizar");
        const especialidadId = document.getElementById("especialidad_id");
        if(especialidadArray.length > 0){
          nameField.value = especialidadArray[1];
          especialidadId.value = especialidadArray[0];
        }
      }
    };
    httpRequire.send();
  };

  getEspecialidad();
}

document.getElementById('botonEditar').addEventListener('click', updateEspecialidad);
function updateEspecialidad(){
  const nombreEspecialidad = document.getElementById("actualizar").value;
  var idEspecialidad = document.getElementById('especialidad_id').value;

  const especialidad = JSON.stringify({
    especialidad_nombre: nombreEspecialidad, 
    especialidad_id : idEspecialidad,
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
      console.error("Error al modificar el medicamento: ", httpRequire.status);
    }
  };
  httpRequire.onerror = function () {
    console.error("Error en la solicitud PUT.");
  };
  httpRequire.send(especialidad);
}

function deleteRegister(){
  const row = event.target.closest('tr');
  let idEspecialidad = row.querySelector('#idEspecialidad').textContent;
  swal({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará el registro permanentemente.",
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if(willDelete){
      let urlDelete = `http://127.0.0.1:3000/api/clinica/especialidades/${idEspecialidad}`;
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