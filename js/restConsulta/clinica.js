const httpReq = new XMLHttpRequest();
let urlClinica = "http://127.0.0.1:3000/api/clinica/clinicas/";

function clinica(){
    const getClinicas = () => {
        httpReq.open("GET", urlClinica);
        httpReq.onload = function(){
        if (httpReq.readyState === 4 && httpReq.status === 200) {
            const cboClinica = document.getElementById("clinicaField");
            const cboClinicaUpdate = document.getElementById("uptNumClinica");
            const clinicas = JSON.parse(httpReq.responseText);
            clinicas.forEach((clinica) => {
                if(clinica[6] === '1'){
                const option = document.createElement('option');
                option.textContent = clinica[1];
                option.value = clinica[0];
                cboClinica.appendChild(option);
                const optionUpt = document.createElement('option');
                optionUpt.textContent = clinica[1];
                optionUpt.value = clinica[0];
                cboClinicaUpdate.appendChild(optionUpt);
                }
            });
        }else {
            console.error("Request failed with status:", httpReq.status);
        }
    }
    httpReq.send();
    };
    getClinicas();
}

clinica();