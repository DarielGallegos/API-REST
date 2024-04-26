const httpRequire = new XMLHttpRequest();
let url = "http://127.0.0.1:3000/api/clinica/horarios/";

const getAll = () => {
  httpRequire.open("GET", url);
  httpRequire.onload = function () {
  if (httpRequire.readyState === 4 && httpRequire.status === 200) {
    const horarios = JSON.parse(httpRequire.responseText);
    const tableBody = document.getElementById("bodyTable");
    horarios.forEach((horario) => {
      if(horario[6] === '1'){
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.id = "btn-edit"
        editButton.className = "btn btn-warning";
        editButton.innerHTML = '<i class="fa fa-pencil"></i>';
        editButton.addEventListener('click', actualizarHorario);
        const deleteButton = document.createElement("button");
        deleteButton.id = "btn-delete";
        deleteButton.className = "btn btn-danger";
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.addEventListener('click', deleteRegister);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = horario[0];
        idCell.id = "idHorario";
        const nombreCell = document.createElement("td");
        nombreCell.textContent = horario[1];
        const creacionCell = document.createElement("td");
        creacionCell.textContent = horario[2];
        const actualizacionCell = document.createElement("td");
        actualizacionCell.textContent = horario[3];
        const cByCell = document.createElement("td");
        cByCell.textContent = horario[4];
        const uByCell = document.createElement("td");
        uByCell.textContent = horario[5];
        const statusCell = document.createElement("td");
        statusCell.textContent = horario[6];
        row.appendChild(actionCell);
        row.appendChild(idCell);
        row.appendChild(nombreCell);
        row.appendChild(creacionCell);
        row.appendChild(actualizacionCell);
        row.appendChild(cByCell);
        row.appendChild(uByCell);
        row.appendChild(statusCell)
        tableBody.appendChild(row);
      }
    });
    } else {
      console.error("Request failed with status:", httpRequire.status);
    }
  };
  httpRequire.send();
};

document.getElementById("btnRegister").addEventListener('click', createHorario);
function createHorario(){
  let nombreHorario = document.getElementById("name-horario-field").value;
  let trimHorario = nombreHorario.trim();
  if(trimHorario === ""){
    swal("Error", "Debe completar los campos del formulario", "error");
    return;
  }
  
  document.getElementById("name-horario-field").value = "";
  const nuevaClinica = JSON.stringify({
    horarios_nombre : nombreHorario,
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
  httpRequire.send(nuevaClinica);
};

var myModal = new bootstrap.Modal(document.getElementById('ventana'));
function actualizarHorario(){
  myModal.show();
  const row = event.target.closest('tr');
  let idHorario = row.querySelector('#idHorario').textContent;
  let urlGet = `http://127.0.0.1:3000/api/clinica/horarios/${idHorario}`;
  const getHorario = () =>{
    httpRequire.open("GET", urlGet);
    httpRequire.onload = function(){
      if(httpRequire.readyState === 4 && httpRequire.status === 200){
        const horario = JSON.parse(httpRequire.responseText);
        const nameField = document.getElementById("actualizar");
        const horarioId = document.getElementById("horario_id");
        if(horario.length > 0){
          nameField.value = horario[1];
          horarioId.value = horario[0];
        }
      }
    };
    httpRequire.send();
  }
  getHorario();
};

document.getElementById('botonEditar').addEventListener('click', updateHorario);
function updateHorario(){
  const nombreHorario = document.getElementById("actualizar").value;
  var idHorario = document.getElementById('horario_id').value;

  const horario = JSON.stringify({
    horarios_nombre: nombreHorario, 
    horarios_id: idHorario,
  });
  httpRequire.open("PUT", url);
  httpRequire.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  httpRequire.onload = function(){
    if(httpRequire.readyState === 4 && httpRequire.status === 200){
      const body = document.getElementById("bodyTable");
      while(body.firstChild){
        body.removeChild(body.firstChild);
      }
      getAll();
      location.reload();
    }else{
      console.error("Error al modificar el horario: ", httpRequire.status);
    }
  };
  httpRequire.onerror = function(){
    console.error("Error en la solicitud PUT.");
  }
  httpRequire.send(horario);
};

function deleteRegister(){
  const row = event.target.closest('tr');
  var idHorario = row.querySelector('#idHorario').textContent;
  swal({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará el registro permanentemente.",
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if(willDelete){
      let urlDelete = `http://127.0.0.1:3000/api/clinica/horarios/${idHorario}`;
      httpRequire.open("DELETE", urlDelete);
      httpRequire.onload = function () {
        if(httpRequire.readyState === 4 && httpRequire.status === 200){
          const body = document.getElementById("bodyTable");
          while (body.firstChild) {
            body.removeChild(body.firstChild);
          }
          getAll();
          }else{
            console.error("Error al borrar el horario:", httpRequire.status);
          };
        };
      httpRequire.send();
    }else{
      swal("Cancelado", "El registro no ha sido eliminado.", "info");
    }
  });
};

getAll();