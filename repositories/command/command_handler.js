const service = require('./domain');

const insert = async (data) => {
  const insert = async () => {
    const f = new service;
    const result = await f.insert(data);
    return result;
  };
  const response = await insert();
  return response;
};

const update = async (data) => {
  const update = async () => {
    const f = new service;
    const result = await f.update(data);
    return result;
  };
  const response = await update();
  return response;
};

const remove = async (data) => {
  const remove = async () => {
    const f = new service;
    const result = await f.remove(data);
    return result;
  };
  const response = await remove();
  return response;
};

module.exports = {
  insert: insert,
  update: update,
  remove : remove
};
