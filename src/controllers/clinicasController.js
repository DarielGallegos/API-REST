const {getConnection} = require('../database/databaseORCL.js');

const getAllRegister = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.execute("SELECT * FROM CLINICA ORDER BY CLINICA_ID DESC");
    res.json(result.rows);
}

const getOneRegister = async (req, res) => {
    const connection = await getConnection();
    const {clinica_id} = req.params;
    const result = await connection.execute(`SELECT * FROM CLINICA WHERE CLINICA_ID = ${clinica_id}`);
    if (result.rows.length === 0) {
        return res.status(404).send("Clinica no encontrado");
    }
    const clinicaIndividual = result.rows[0];
    res.json(clinicaIndividual);
}

const createNewRegister = async (req, res) => {
    try{
        const {clinica_numero} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('INSERT INTO CLINICA(CLINICA_NUMERO) VALUES(:clinica_numero)', [clinica_numero]);
        await connection.commit();
        res.status(200).send({message : "POST: Insercion de datos ejecutada correctamente."}); 
    }catch(err){
        res.status(500).send(err.message);
    }
}


const updateOneRegister = async (req, res) => {
    try{
        const {clinica_numero, clinica_id} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('UPDATE CLINICA SET CLINICA_NUMERO = :clinica_numero WHERE CLINICA_ID = :clinica_id', [clinica_numero, clinica_id]);
        await connection.commit();
        res.status(200).send({message: "PUT: Actualizacion de datos ejecutada correctamente."});
    }catch(err){
        
    }
}

const deleteOneRegister = async (req, res) => {
    try{
        const {clinica_id} = req.params;
        const connection = await getConnection();
        const result = await connection.execute(`UPDATE CLINICA SET CLINICA_STATUS = '0' WHERE CLINICA_ID = ${clinica_id}`);
        await connection.commit();
        res.status(200).send({message : "DELETE: Eliminacion de registro ejecutada correctamente."});
    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllRegister,
    getOneRegister,
    createNewRegister,
    updateOneRegister,
    deleteOneRegister,
};