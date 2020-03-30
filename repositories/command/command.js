const MySQL = require('../../../../helpers/databases/mysql/db');
const config = require('../../../../infra/configs/global_config');
const uuidv1 = require('uuid/v1');

const insert = async (data) => {
  const id = uuidv1();
  const db = new MySQL(config.get('/mysqlConfig'));
  const query = `INSERT INTO attachment_template  (id, service_id, type, name, path, created_at, file_type, file_size) VALUES
                 ('${id}', '${data.service_id}', '${data.type}', '${data.name}', '${data.path}', now(), '${data.file_type}', '${data.file_size}')`;
  const recordset = await db.query(query);
  return recordset;
};

const update = async (data) => {
  const db = new MySQL(config.get('/mysqlConfig'));
  const query = `UPDATE attachment_template set
                service_id = '${data.service_id}',
                type = '${data.type}',
                name = '${data.name}',
                path = '${data.path}',
                file_type = '${data.file_type}',
                file_size = '${data.file_size}',
                updated_at = now()
                where id='${data.id}' `;
  const recordset = await db.query(query);
  return recordset;
};

const remove = async (data) => {
  const db = new MySQL(config.get('/mysqlConfig'));
  const query = `DELETE FROM attachment_template where id='${data.id}' `;
  const recordset = await db.query(query);
  return recordset;
};

module.exports = {
  update: update,
  insert: insert,
  remove: remove,
};
