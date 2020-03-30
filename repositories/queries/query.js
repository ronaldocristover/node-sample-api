const MySQL = require('../../../../helpers/databases/mysql/db');
const config = require('../../../../infra/configs/global_config');

const get = async (data) => {
  const db = new MySQL(config.get('/mysqlConfig'));

  let query = 'SELECT * FROM attachment_template ';

  let serviceId = '';
  if(typeof data.service_id !== 'undefined'){
    serviceId = data.service_id;
  }
  query += `where service_id like '%${serviceId}%' `;

  if(typeof data.type !== 'undefined'){
    query += `and file_type = '${data.type}' `;
  }

  if(typeof data.name !=='undefined'){
    query += `and name like '%${data.name}%' `;
  }

  query += 'ORDER BY name ASC';
  if((typeof data.size !== 'undefined') && (typeof data.page !== 'undefined')){
    let offset = (data.page - 1) * data.size;
    query += ` limit ${data.size} offset ${offset}`;
  }
  const recordset = await db.query(query);
  return recordset;
};

const findById = async (data) => {
  const db = new MySQL(config.get('/mysqlConfig'));
  const query = `SELECT * FROM attachment_template where id='${data.id}' ORDER BY name ASC`;
  const recordset = await db.query(query);
  return recordset;
};

const findByService = async (data) => {
  const db = new MySQL(config.get('/mysqlConfig'));
  const query = `SELECT * FROM attachment_template where service_id='${data.service_id}' ORDER BY name, type ASC`;
  const recordset = await db.query(query);
  console.log(query);
  return recordset;
};

module.exports = {
  get: get,
  findById : findById,
  findByService : findByService
};
