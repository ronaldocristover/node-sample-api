const document = require('./domain');

const get = async (data) => {
  const get = async () => {
    const s = new document;
    const result = await s.get(data);
    return result;
  };
  const response = await get();
  return response;
};

const findById = async (data) => {
  const findById = async () => {
    const s = new document;
    const result = await s.findById(data);
    return result;
  };
  const response = await findById();
  return response;
};

const findByService = async (data) => {
  const findByService = async () => {
    const s = new document;
    const result = await s.findByService(data);
    return result;
  };
  const response = await findByService();
  return response;
};

module.exports = {
  get: get,
  findById : findById,
  findByService : findByService
};
