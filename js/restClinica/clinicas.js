const httpRequire = new XMLHttpRequest();
let url = "http://127.0.0.1:3000/api/clinica/clinicas/";

const getAll = () => {
  httpRequire.open("GET", url);
  httpRequire.onload = function () {
  if (httpRequire.readyState === 4 && httpRequire.status === 200) {
    const clinicas = JSON.parse(httpRequire.responseText);
    const tableBody = document.getElementById("bodyTable");
    clinicas.forEach((clinica) => {
      if(clinica[6] === '1'){
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.id = "btn-edit"
        editButton.className = "btn btn-warning";
        editButton.innerHTML = '<i class="fa fa-pencil"></i>';
        editButton.addEventListener('click', actualizarClinica);
        const deleteButton = document.createElement("button");
        deleteButton.id = "btn-delete";
        deleteButton.className = "btn btn-danger";
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.addEventListener('click', deleteRegister);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = clinica[0];
        idCell.id = "idClinica";
        const nombreCell = document.createElement("td");
        nombreCell.textContent = clinica[1];
        const creacionCell = document.createElement("td");
        creacionCell.textContent = clinica[2];
        const actualizacionCell = document.createElement("td");
        actualizacionCell.textContent = clinica[3];
        const cByCell = document.createElement("td");
        cByCell.textContent = clinica[4];
        const uByCell = document.createElement("td");
        uByCell.textContent = clinica[5];
        const statusCell = document.createElement("td");
        statusCell.textContent = clinica[6];
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

document.getElementById("btnRegister").addEventListener('click', createClinica);
function createClinica() {
  // Get the input value
  let numeroClinica = document.getElementById("number-clinica-field").value;

  // Trim the input value to remove leading/trailing spaces
  numeroClinica = numeroClinica.trim();

  // Check if the input is empty
  if (numeroClinica === "") {
    // Display a SweetAlert message
    swal("Error", "Debe completar los datos del formulario", "error");
    return; // Stop execution
  }

  // Convert input to integer
  numeroClinica = parseInt(numeroClinica);

  // Clear the input field
  document.getElementById("number-clinica-field").value = "";

  // Prepare the data for POST request
  const nuevaClinica = JSON.stringify({
    clinica_numero: numeroClinica,
  });

  // Make the POST request
  httpRequire.open("POST", url);
  httpRequire.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  httpRequire.onload = function () {
    if (httpRequire.readyState === 4 && httpRequire.status === 200) {
      console.log(JSON.parse(httpRequire.responseText));
      const body = document.getElementById("bodyTable");
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
      getAll();
    } else {
      console.error("Error al crear medicamento: ", httpRequire.status);
    }
  };
  httpRequire.onerror = function () {
    console.error("Error en la solicitud POST.");
  };
  httpRequire.send(nuevaClinica);
}

var myModal = new bootstrap.Modal(document.getElementById('ventana'));
function actualizarClinica(){
  myModal.show();
  const row = event.target.closest('tr');
  let idClinica = row.querySelector('#idClinica').textContent;
  let urlGet = `http://127.0.0.1:3000/api/clinica/clinicas/${idClinica}`;
  const getClinica = () => {
    httpRequire.open("GET", urlGet);
    httpRequire.onload = function (){
      if(httpRequire.readyState === 4 && httpRequire.status === 200){
        const clinica = JSON.parse(httpRequire.responseText);
        const nameField = document.getElementById("actualizar");
        const especialidadId = document.getElementById("clinica_id");
        if(clinica.length > 0){
          nameField.value = clinica[1];
          especialidadId.value = clinica[0];
        }
      }
    };
  httpRequire.send();
  };
  getClinica();
}

document.getElementById('botonEditar').addEventListener('click', updateClinica);
function updateClinica(){
  const numeroClinica = document.getElementById("actualizar").value;
  var idClinica = document.getElementById('clinica_id').value;

  const clinica = JSON.stringify({
    clinica_numero: numeroClinica, 
    clinica_id: idClinica, 
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
      console.error("Error al modificar la clinica: ", httpRequire.status);
    }
  };
  httpRequire.onerror = function () {
    console.error("Error en la solicitud PUT.");
  };
  httpRequire.send(clinica);
}

function deleteRegister(){
  const row = event.target.closest('tr');
  let idClinica = row.querySelector('#idClinica').textContent;
  swal({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará el registro permanentemente.",
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if(willDelete){
      let urlDelete = `http://127.0.0.1:3000/api/clinica/clinicas/${idClinica}`;
      httpRequire.open("DELETE", urlDelete);
      httpRequire.onload = function () {
        if(httpRequire.readyState === 4 && httpRequire.status === 200){
          const body = document.getElementById("bodyTable");
          while (body.firstChild) {
            body.removeChild(body.firstChild);
          }
          getAll();
          }else{
            console.error("Error al borrar la clinica:", httpRequire.status);
          };
        };
      httpRequire.send();
    }else{
      swal("Cancelado", "El registro no ha sido eliminado.", "info");
    }
  });
}
getAll();