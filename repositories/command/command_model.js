const joi = require('joi');

const create=joi.object({
  service_id:joi.string().required(),
  type:joi.string().required(),
  name:joi.string().required(),
  path:joi.any(),
  file_type:joi.any(),
  file_size:joi.any(),
});

const update=joi.object({
  id:joi.string().required(),
  service_id:joi.string().required(),
  type:joi.string().required(),
  name:joi.string().required(),
  path:joi.any(),
  file_type:joi.any(),
  file_size:joi.any(),
});

const remove=joi.object({
  id:joi.string().required()
});

module.exports={
  create,
  update,
  remove
};

