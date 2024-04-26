const oracledb = require('oracledb')

const connection = oracledb.getConnection({
  user : 'UTH20230203',
  password : 'UTH20230203',
  connectString : '173.249.59.89:1521/ORCLCDB'
});

const getConnection = () => {
  return connection;
}

module.exports = {
    getConnection,
}
