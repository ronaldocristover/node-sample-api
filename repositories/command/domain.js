const command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');

class document {
  async update(data) {
    let dbUpdate = await command.update(data);
    let dataUpdate = JSON.parse(dbUpdate.data.data);
    return wrapper.data2(200, dataUpdate, 'success', 'Success Update');
  }

  async insert(data) {
    let dbInsert = await command.insert(data);
    let dataInsert = JSON.parse(dbInsert.data.data);
    return wrapper.data2(200, dataInsert, 'success', 'Success Insert');
  }

  async remove(data) {
    let dbRemove = await command.remove(data);
    let dataRemove = JSON.parse(dbRemove.data.data);
    return wrapper.data2(200, dataRemove, 'success', `Succes Remove id:${data.id}`);
  }

}

module.exports = document;
