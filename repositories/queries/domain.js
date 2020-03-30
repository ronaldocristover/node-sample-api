const query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const config = require('../../../../infra/configs/global_config');

class document {
  async get(data) {
    let dataDB = await query.get(data);
    if (dataDB.err){
      return wrapper.data2(400, [], 0, 'Data Not Found');
    }
    let search={};
    if(data.service_id){
      search.service_id=data.service_id;
    }
    if(data.type){
      search.type=data.type;
    }
    let dataLength=await query.get(search);

    let datadocument = JSON.parse(dataDB.data.data);
    let length = JSON.parse(dataLength.data.data).length;

    let collectionData = [];
    let minioHost = config.get('/minio');
    datadocument.forEach(element => {
      collectionData.push({
        'id' : element.id,
        'service_id' : element.service_id,
        'type' : element.type,
        'name' : element.name,
        'path' : `http://${minioHost.endPoint}/${element.path}`,
        'file_type' : element.file_type,
        'file_size' : Number(element.file_size / 1048578).toFixed(2),
        'created_at' : element.created_at,
        'updated_at' : element.updated_at
      });
    });

    return wrapper.data2(200, collectionData, length, 'Document Found');
  }

  async findById(data) {
    let dataDB = await query.findById(data);
    let datadocument = JSON.parse(dataDB.data.data);
    let collectionData = [];
    let minioHost = config.get('/minio');
    datadocument.forEach(element => {
      collectionData.push({
        'id' : element.id,
        'service_id' : element.service_id,
        'type' : element.type,
        'name' : element.name,
        'path' : `http://${minioHost.endPoint}/${element.path}`,
        'file_type' : element.file_type,
        'file_size' : Number(element.file_size / 1048578).toFixed(2),
        'created_at' : element.created_at,
        'updated_at' : element.updated_at
      });
    });

    if (datadocument.length == 0){
      return wrapper.data2(400, JSON.parse(dataDB.data.data), JSON.parse(dataDB.data.data).length, 'Data Not Found');
    }
    return wrapper.data2(200, collectionData, JSON.parse(dataDB.data.data).length, 'Data Found');
  }

  async findByService(data) {
    let dataDB = await query.findByService(data);
    let datadocument = JSON.parse(dataDB.data.data);
    let collectionData = [];
    let minioHost = config.get('/minio');
    datadocument.forEach(element => {
      collectionData.push({
        'id' : element.id,
        'service_id' : element.service_id,
        'type' : element.type,
        'name' : element.name,
        'path' : `http://${minioHost.endPoint}/${element.image_thumb}`,
        'file_type' : element.file_type,
        'file_size' : Number(element.file_size / 1048578).toFixed(2),
        'created_at' : element.created_at,
        'updated_at' : element.updated_at
      });
    });

    if (datadocument.length == 0){
      return wrapper.data2(400, JSON.parse(dataDB.data.data), JSON.parse(dataDB.data.data).length, 'Data Not Found');
    }
    return wrapper.data2(200, collectionData, JSON.parse(dataDB.data.data).length, 'Data Found');
  }
}

module.exports = document;
