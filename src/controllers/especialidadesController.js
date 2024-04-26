const {getConnection} = require('../database/databaseORCL.js');

const getAllRegister = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.execute("SELECT * FROM ESPECIALIDADES ORDER BY ESPECIALIDAD_ID DESC");
    res.json(result.rows);
}

const getOneRegister = async (req, res) => {
    const connection = await getConnection();
    const {id_especialidad} = req.params;
    const result = await connection.execute(`SELECT * FROM ESPECIALIDADES WHERE ESPECIALIDAD_ID = ${id_especialidad}`);
    if (result.rows.length === 0) {
        return res.status(404).send("Especialidad no encontrado");
    }
    const especialidadIndividual = result.rows[0];
    res.json(especialidadIndividual);
}

const createNewRegister = async (req, res) => {
    try{
        const {especialidad_nombre} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('INSERT INTO ESPECIALIDADES(ESPECIALIDAD_NOMBRE) VALUES(:especialidad_nombre)', [especialidad_nombre]);
        await connection.commit();
        res.status(200).send({message: "POST: Insercion de datos ejecutada correctamente"});
    } catch(err){
        res.status(500).send(err.message);
    }
}

const updateOneRegister =async  (req, res) => {
    try{
        const {especialidad_nombre, especialidad_id} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('UPDATE especialidades SET ESPECIALIDAD_NOMBRE = :especialidad_nombre WHERE ESPECIALIDAD_ID = :especialidad_id', [especialidad_nombre, especialidad_id]);
        await connection.commit();
        res.status(200).send({message: "PUT: Actualizacion de datos ejecutada correctamente"});
    }catch(err){
        res.status(500).send(err.message);
    }
}

const deleteOneRegister = async (req, res) => {
    try{
        const {especialidad_id} = req.params;
        const connection = await getConnection();
        const result = await connection.execute(`UPDATE ESPECIALIDADES SET ESPECIALIDAD_STATUS = '0' WHERE ESPECIALIDAD_ID = ${especialidad_id}`);
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