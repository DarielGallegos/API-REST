const httpRequire = new XMLHttpRequest();
let url = "http://127.0.0.1:3000/api/clinica/medicamentos/";
var idCell="";
const getAll = () => {
  httpRequire.open("GET", url);
  httpRequire.onload = function () {
  if (httpRequire.readyState === 4 && httpRequire.status === 200) {
    const medicamentos = JSON.parse(httpRequire.responseText);
       const tableBody = document.getElementById("bodyTable");
        medicamentos.forEach((medicamento) => {
          if(medicamento[6] === "1"){
            const row = document.createElement("tr");
            //Cell Action
            const actionCell = document.createElement("td");
           
            const editButton = document.createElement("button");
            editButton.id = "btn-edit";
            editButton.className = "btn btn-warning";
            editButton.innerHTML = '<i class="fa fa-pencil"></i>';
            editButton.addEventListener('click', ActualizarMedicamento);
            const deleteButton = document.createElement("button");
            deleteButton.id = "btn-delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
            deleteButton.addEventListener('click', deleteRegister);
           
            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);
            //Fin Cell action

            idCell = document.createElement("td");
            idCell.id = "idMedicamento";
            idCell.textContent = medicamento[0];
            const nombreCell = document.createElement("td");
            nombreCell.textContent = medicamento[1];
            const creacionCell = document.createElement("td");
            creacionCell.textContent = medicamento[2];
            const actualizacionCell = document.createElement("td");
            actualizacionCell.textContent = medicamento[3];
            const cByCell = document.createElement("td");
            cByCell.textContent = medicamento[4];
            const uByCell = document.createElement("td");
            uByCell.textContent = medicamento[5];
            const statusCell = document.createElement("td");
            statusCell.textContent = medicamento[6]
            row.appendChild(actionCell);
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

document.getElementById('btnRegister').addEventListener('click', createMedicamento);

function createMedicamento() {
  const nombreMedicamento = document.getElementById("name-field").value;

  // Trim the input value to remove leading/trailing spaces
  const trimmedNombreMedicamento = nombreMedicamento.trim();

  // Check if the input is empty
  if (trimmedNombreMedicamento === "") {
    // Display a SweetAlert message
    swal("Error", "Debe completar los campos del formulario", "error");
    return; // Stop execution
  }

  // Clear the input field
  document.getElementById("name-field").value = "";

  const nuevoMedicamento = JSON.stringify({
    medicamento_nombre: trimmedNombreMedicamento,
  });

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
      console.error("Error al crear el medicamento:", httpRequire.status);
    }
  };
  httpRequire.onerror = function () {
    console.error("Error en la solicitud POST.");
  };
  httpRequire.send(nuevoMedicamento);
}



function deleteRegister(){
    const row = event.target.closest('tr'); // Find the parent row
    let idMed = row.querySelector('#idMedicamento').textContent; // Get the medication ID (adjust this based on your HTML structure)

    // Display a SweetAlert confirmation
    swal({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el registro permanentemente.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let urlDelete = `http://127.0.0.1:3000/api/clinica/medicamentos/${idMed}`;
        httpRequire.open("DELETE", urlDelete);
        httpRequire.onload = function () {
          if (httpRequire.readyState === 4 && httpRequire.status === 200) {
            const body = document.getElementById("bodyTable");
            while (body.firstChild) {
              body.removeChild(body.firstChild);
            }
            getAll();
          } else {
            console.error("Error al borrar el medicamento:", httpRequire.status);
          }
        };
        httpRequire.send();
      } else {
        // User clicked "Cancelar"
        swal("Cancelado", "El registro no ha sido eliminado.", "info");
      }
    });
}

var myModal = new bootstrap.Modal(document.getElementById('ventana'));  
function ActualizarMedicamento() {
  // Mostrar la ventana modal  
  myModal.show();
  const row = event.target.closest('tr'); // Find the parent row
  let idMed = row.querySelector('#idMedicamento').textContent;
  let urlGet = `http://127.0.0.1:3000/api/clinica/medicamentos/${idMed}`;
  const getMedicamento = () => {
    httpRequire.open("GET", urlGet);
    httpRequire.onload = function () {
      if (httpRequire.readyState === 4 && httpRequire.status === 200) {
        const medicamentos = JSON.parse(httpRequire.responseText);
        const nameField = document.getElementById("actualizar");
        const medicamento_id = document.getElementById("medicamento_id");
        
        // Asignar el valor del primer medicamento a nameField
        if (medicamentos.length > 0) {          
          nameField.value = medicamentos[1]; // Ajusta la propiedad adecuada de 'medicamentos'
          medicamento_id.value = medicamentos[0];
        }
      }
    };
    
    httpRequire.send();
    
  };
  
  getMedicamento(); // Llamar a la función getMedicamento para obtener y asignar los datos
}




//funcion para editar el registro
document.getElementById('botonEditar').addEventListener('click', UpdateMedicamento);
function UpdateMedicamento() {
  const nombreMedicamento = document.getElementById("actualizar").value;

  var idMed = document.getElementById('medicamento_id').value;
  console.log(nombreMedicamento);
  console.log(idMed);
  
  const nuevoMedicamento = JSON.stringify({
    medicamento_nombre: nombreMedicamento,
    medicamento_id: idMed,
  });

  httpRequire.open("PUT", url);
  httpRequire.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  httpRequire.onload = function () {
    if (httpRequire.readyState === 4 && httpRequire.status === 200) {
      console.log(JSON.parse(httpRequire.responseText));
      const body = document.getElementById("bodyTable");
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
      
      getAll();
      location.reload();
      
    } else {
      
      console.error("Error al modificar el medicamento:", httpRequire.status);
    }
  };
  httpRequire.onerror = function () {
    console.error("Error en la solicitud PUT.");
  };
  httpRequire.send(nuevoMedicamento);

}
//fin de funcion para editar el registro

getAll();