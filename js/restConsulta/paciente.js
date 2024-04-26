const http = new XMLHttpRequest();
let urlPacientes = "http://127.0.0.1:3000/api/clinica/pacientes/";

function pacientes(){
    const getPacientes = () => {
    http.open("GET", urlPacientes);
    http.onload = function(){
        if (http.readyState === 4 && http.status === 200) {
            const cboPacientes = document.getElementById("pacienteField");
            const cboPacientesUpt = document.getElementById("uptIdPaciente");
            const pacientes = JSON.parse(http.responseText);
            pacientes.forEach((paciente) => {
                if(paciente[13] === '1'){
                const option = document.createElement('option');
                option.textContent = paciente[1];
                option.value = paciente[0];
                cboPacientes.appendChild(option);
                const optionUpt = document.createElement('option');
                optionUpt.textContent = paciente[1];
                optionUpt.value = paciente[0];
                cboPacientesUpt.appendChild(optionUpt);
                }
            });
        }else {
            console.error("Request failed with status:", http.status);
        }
    }
    http.send();
    };
    getPacientes();
}

pacientes();