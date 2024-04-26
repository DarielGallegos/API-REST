const {getConnection} = require('../database/databaseORCL.js');

const getAllRegister = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.execute("SELECT * FROM HORARIOS ORDER BY HORARIOS_ID DESC");
    res.json(result.rows);
}

const getOneRegister = async (req, res) => {
    const connection = await getConnection();
    const {horario_id} = req.params;
    const result = await connection.execute(`SELECT * FROM HORARIOS WHERE HORARIOS_ID = ${horario_id}`);
    if (result.rows.length === 0) {
        return res.status(404).send("Medicamento no encontrado");
    }
    const horarioIndividual = result.rows[0];
    res.json(horarioIndividual);
}

const createNewRegister = async (req, res) => {
      try{ 
        const {horarios_nombre} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('INSERT INTO HORARIOS(HORARIOS_NOMBRE) VALUES(:horarios_nombre)', [horarios_nombre]);
        await connection.commit();
        res.status(200).send({message: "POST: Insercion de datos ejecutada correctamente."});
      }catch(err){
        res.status(500).send(err.message);
      }
}

const updateOneRegister = async (req, res) => {
    try{
        const {horarios_nombre, horarios_id} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('UPDATE HORARIOS SET HORARIOS_NOMBRE = :horarios_nombre WHERE HORARIOS_ID = :horarios_id', [horarios_nombre, horarios_id]);
        await connection.commit();
        res.status(200).send({message: "PUT: Actualizacion de datos ejecutada correctamente."});
    }catch(err){
        res.status(500).send(err.message);
    }
}

const deleteOneRegister = async (req, res) => {
    try{
        const {horario_id} = req.params;
        const connection = await getConnection();
        const result = await connection.execute(`UPDATE HORARIOS SET HORARIOS_STATUS = '0' WHERE HORARIOS_ID = ${horario_id}`);
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