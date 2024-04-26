const httpRequi = new XMLHttpRequest();
let urlHorario = "http://127.0.0.1:3000/api/clinica/horarios/";

function horarios(){
    const getHorarios = () => {
    httpRequi.open("GET", urlHorario);
    httpRequi.onload = function(){
        if (httpRequi.readyState === 4 && httpRequi.status === 200) {
            const cboHorario = document.getElementById("horarioField");
            const cboHorarioUpt = document.getElementById("uptHorario");
            const horarios = JSON.parse(httpRequi.responseText);
            horarios.forEach((horario) => {
                if(horario[6] === '1'){
                const option = document.createElement('option');
                option.textContent = horario[1];
                option.value = horario[0];
                cboHorario.appendChild(option);
                const optionUpt = document.createElement('option');
                optionUpt.textContent = horario[1];
                optionUpt.value = horario[0];
                cboHorarioUpt.appendChild(optionUpt);
                }
            });
        }else {
            console.error("Request failed with status:", httpRequi.status);
        }
    }
    httpRequi.send();
    };
    getHorarios();
}

horarios();