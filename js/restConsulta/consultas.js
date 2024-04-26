const httpRequire = new XMLHttpRequest();
let url = "http://127.0.0.1:3000/api/clinica/consultas/";

const getAll = () => {
  httpRequire.open("GET", url);
  httpRequire.onload = function () {
  if (httpRequire.readyState === 4 && httpRequire.status === 200) {
    const consultas = JSON.parse(httpRequire.responseText);
       const tableBody = document.getElementById("bodyTable");
        consultas.forEach((consulta) => {
          if(consulta[11] === '1'){
            const actionCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.id = "btn-edit"
            editButton.className = "btn btn-warning";
            editButton.innerHTML = '<i class="fa fa-pencil"></i>';
            editButton.addEventListener('click', actualizarConsulta);
            const deleteButton = document.createElement("button");
            deleteButton.id = "btn-delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
            deleteButton.addEventListener('click', deleteRegister);
            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);

            const row = document.createElement("tr");
            const idCell = document.createElement("td");
            idCell.textContent = consulta[0];
            idCell.id = "idConsulta";
            const condicionCell = document.createElement("td");
            condicionCell.textContent = consulta[2];
            const razonCell = document.createElement("td");
            razonCell.textContent = consulta[1];
            const horarioCell = document.createElement("td");
            horarioCell.textContent = consulta[3];
            const pacienteCell = document.createElement("td");
            pacienteCell.textContent = consulta[4];
            const doctorCell = document.createElement("td");
            doctorCell.textContent = consulta[5];
            const statusCell = document.createElement("td");
            statusCell.textContent = consulta[11];

            row.appendChild(actionCell);
            row.appendChild(idCell);
            row.appendChild(condicionCell);
            row.appendChild(razonCell);
            row.appendChild(doctorCell);
            row.appendChild(pacienteCell);
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
  const razonConsulta = document.getElementById("razon-field").value;
  const condicionConsulta = document.getElementById("condicion-field").value;
  const clinica = document.getElementById("clinicaField").value;
  const doctor = document.getElementById("doctorField").value;
  const paciente = document.getElementById("pacienteField").value;
  const horario = document.getElementById("horarioField").value;
  let trimRazon = razonConsulta;
  let trimCondicion = condicionConsulta;
  let trimClinica = clinica;
  let trimDoctor = doctor;
  let trimPaciente = paciente;
  let trimHorario = horario;

  if(trimRazon === "" || trimCondicion === "" || trimClinica === "" || trimDoctor === "" || trimPaciente === "" || trimHorario === "" ){
    swal("Error", "Debe completar los campos del formulario", "error");
    return;
  }

  document.getElementById("razon-field").value = "";
  document.getElementById("condicion-field").value = "";


  const newConsulta = JSON.stringify({
    consulta_motivo : razonConsulta, 
    consulta_estado : condicionConsulta, 
    horario_id : horario, 
    paciente_id : paciente, 
    doctor_id : doctor, 
    clinica_id : clinica,
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
  httpRequire.send(newConsulta);
};

var myModal = new bootstrap.Modal(document.getElementById('ventana'));
function actualizarConsulta(){
  myModal.show();
  const row = event.target.closest('tr');
  let idConsulta = row.querySelector('#idConsulta').textContent;
  let urlGet = `http://127.0.0.1:3000/api/clinica/consultas/${idConsulta}`;
  const getConsulta = () => {
    httpRequire.open("GET", urlGet);
    httpRequire.onload = function(){
      const consulta = JSON.parse(httpRequire.responseText);
      const consultaId = document.getElementById("consulta_id");
      const clinicaId = document.getElementById("uptNumClinica");
      const doctorId = document.getElementById("uptIdDoctor");
      const pacienteId = document.getElementById("uptIdPaciente");
      const horarioId = document.getElementById("uptHorario");
      const estadoField = document.getElementById("uptEstado");
      const razonField = document.getElementById("uptRazonVisita");
      if(consulta.length > 0){
        consultaId.value = consulta[0];
        clinicaId.value = consulta[6];
        doctorId.value = consulta[5];
        pacienteId.value = consulta[4];
        horarioId.value = consulta[3];
        estadoField.value = consulta[2];
        razonField.value = consulta[1];
      }
    }
    httpRequire.send();
  }
  getConsulta();
}

document.getElementById('botonEditar').addEventListener('click', updatePaciente);
function updatePaciente(){
  const consultaId = document.getElementById("consulta_id").value;
  const clinicaId = document.getElementById("uptNumClinica").value;
  const doctorId = document.getElementById("uptIdDoctor").value;
  const pacienteId = document.getElementById("uptIdPaciente").value;
  const horarioId = document.getElementById("uptHorario").value;
  const estadoField = document.getElementById("uptEstado").value;
  const razonField = document.getElementById("uptRazonVisita").value;

  const consulta = JSON.stringify({
    consulta_motivo:razonField, 
    consulta_estado:estadoField, 
    horario_id:horarioId, 
    paciente_id:pacienteId, 
    doctor_id:doctorId, 
    clinica_id:clinicaId, 
    consulta_id:consultaId,
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
      console.error("Error al modificar consulta: ", httpRequire.status);
    }
  };
  httpRequire.onerror = function () {
    console.error("Error en la solicitud PUT.");
  };
  httpRequire.send(consulta);
}


function deleteRegister(){
  const row = event.target.closest('tr');
  let idConsulta = row.querySelector('#idConsulta').textContent;
  swal({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará el registro permanentemente.",
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if(willDelete){
      let urlDelete = `http://127.0.0.1:3000/api/clinica/consultas/${idConsulta}`;
      httpRequire.open("DELETE", urlDelete);
      httpRequire.onload = function () {
        if(httpRequire.readyState === 4 && httpRequire.status === 200){
          const body = document.getElementById("bodyTable");
          while (body.firstChild) {
            body.removeChild(body.firstChild);
          }
          getAll();
          }else{
            console.error("Error al borrar la consulta:", httpRequire.status);
          };
        };
      httpRequire.send();
    }else{
      swal("Cancelado", "El registro no ha sido eliminado.", "info");
    }
  });
}
getAll();