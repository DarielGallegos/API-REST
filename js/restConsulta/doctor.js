const httpRequired = new XMLHttpRequest();
let urlDoctor = "http://127.0.0.1:3000/api/clinica/doctores/";

function doctores(){
    const getDoctors = () => {
    httpRequired.open("GET", urlDoctor);
    httpRequired.onload = function(){
        if (httpRequired.readyState === 4 && httpRequired.status === 200) {
            const cboDoctor = document.getElementById("doctorField");
            const cboDoctorUpt = document.getElementById("uptIdDoctor");
            const doctores = JSON.parse(httpRequired.responseText);
            doctores.forEach((doctor) => {
                if(doctor[11] === '1'){
                const option = document.createElement('option');
                option.textContent = doctor[1];
                option.value = doctor[0];
                cboDoctor.appendChild(option);
                const optionUpt = document.createElement('option');
                optionUpt.textContent = doctor[1];
                optionUpt.value = doctor[0];
                cboDoctorUpt.appendChild(optionUpt);
                }
            });
        }else {
            console.error("Request failed with status:", httpRequired.status);
        }
    }
    httpRequired.send();
    };
    getDoctors();
}

doctores();