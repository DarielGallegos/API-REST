const { request } = require('express');
const {getConnection} = require('../database/databaseORCL.js');

const getAllRegister = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.execute("SELECT * FROM MEDICAMENTOS ORDER BY MEDICAMENTO_ID DESC");
    res.send(result.rows);
}

const obtenerRegistroIndividual = async (req, res) => {
    const connection = await getConnection();
    const { id_medicamento } = req.params; // Suponiendo que se obtiene el parámetro desde la URL
    
    const resultado = await connection.execute("SELECT * FROM MEDICAMENTOS WHERE MEDICAMENTO_ID = :id_medicamento", {
        id_medicamento: id_medicamento
    });
    
    if (resultado.rows.length === 0) {
        return res.status(404).send("Medicamento no encontrado");
    }
    
    const medicamentoIndividual = resultado.rows[0];
    res.send(medicamentoIndividual);
}


const createNewRegister = async (req, res) => {
    try{
        const {medicamento_nombre} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('INSERT INTO MEDICAMENTOS(medicamento_nombre) VALUES(:medicamento_nombre)', [medicamento_nombre]);
        await connection.commit(); 
        res.status(200).send({message : "POST: Insercion de datos ejecutada correctamente."}); 
    } catch(err){
        res.status(500);
        res.send(err.message);
    }  
}

const updateOneRegister = async (req, res) => {
    try{
        const {medicamento_nombre, medicamento_id} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('UPDATE MEDICAMENTOS SET MEDICAMENTO_NOMBRE = :medicamento_nombre WHERE MEDICAMENTO_ID = :medicamento_id', [medicamento_nombre, medicamento_id]);
        await connection.commit();
        res.status(200).send({message: "PUT: Actualizacion de datos ejecutada correctamente."});
    }  catch(err){
        res.status(500).send(err.message);
    }
}

const deleteOneRegister = async (req, res) => {
    try{
        const {medicamento_id} = req.params;
        const connection = await getConnection();
        const result = await connection.execute(`UPDATE MEDICAMENTOS SET MEDICAMENTO_STATUS = '0' WHERE MEDICAMENTO_ID = ${medicamento_id}`);
       await connection.commit();
        res.status(200).send({message : "DELETE: Eliminacion de registro ejecutada correctamente."});
    }catch(err){
        res.status(500).send(err.message);
    } 
}


module.exports = {
    getAllRegister,
    createNewRegister,
    updateOneRegister,
    deleteOneRegister,
    obtenerRegistroIndividual,
};

