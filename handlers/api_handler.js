const wrapper = require('../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const commandHandler = require('../repositories/command/command_handler');
const commandModel = require('../repositories/command/command_model');
const validator = require('../utils/validator');
const fileUploadHandler = require('../../../helpers/components/file/fileUploadHandler');

const get = async (req, res) => {
  const get = async () => {
    return await queryHandler.get(req.query);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.pagination1(res, [] ,req, 0, result.code, result.message) :
      wrapper.pagination1(res, result.content,req,result.totalItems,result.code, result.message);
  };
  sendResponse(await get());
};

const findById = async (req, res) => {
  const findById = async () => {
    return await queryHandler.findById(req.params);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };
  sendResponse(await findById());
};

const findByService = async (req, res) => {
  const findByService = async () => {
    return await queryHandler.findByService(req.body);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };
  sendResponse(await findByService());
};

const update = async (req, res) => {
  let payload=req.body;

  payload.path = '';
  if((typeof(req.files) != 'undefined') || (req.files !== null) || (req.files !== '')) {
    let f = new fileUploadHandler;
    payload.path = await f.moveMinio('template', req);
    payload.file_size = await f.getSize(req);
    payload.file_type = await f.getExt(req);
  }

  const isValidPayload=validator.isValidPayload(payload,commandModel.update);
  const update = async (result) => {
    if(result.err){
      return result;
    }
    return await commandHandler.update(payload);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };
  sendResponse(await update(isValidPayload));
};

const insert = async (req, res) => {
  let payload=req.body;

  payload.path = '';
  if((typeof(req.files) != 'undefined') || (req.files !== null) || (req.files !== '')) {
    let f = new fileUploadHandler;
    payload.path = await f.moveMinio('template', req);
    payload.file_size = await f.getSize(req);
    payload.file_type = await f.getExt(req);

  }

  const isValidPayload=validator.isValidPayload(payload,commandModel.create);
  const insert = async (result) => {
    if(result.err){
      return result;
    }
    return await commandHandler.insert(payload);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };
  sendResponse(await insert(isValidPayload));
};

const remove = async (req, res) => {
  const payload=req.body;
  const isValidPayload=validator.isValidPayload(payload,commandModel.remove);
  const remove = async (result) => {
    if(result.err){
      return result;
    }
    return await commandHandler.remove(payload);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };
  sendResponse(await remove(isValidPayload));
};

module.exports = {
  get,
  findById,
  findByService,
  update,
  insert,
  remove,
};
