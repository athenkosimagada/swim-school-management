const childRepository = require("../repositories/childRepository");

const getChildrenByUserId = async (userId) => {
  return await childRepository.getChildrenByUserId(userId);
};

const getChildById = async (id) => {
  return await childRepository.getChildById(id);
};

const createChild = async (child) => {
  return await childRepository.createChild(child);
};

const updateChild = async (id, child) => {
  return await childRepository.updateChild(id, child);
};

const deleteChild = async (id) => {
  return await childRepository.deleteChild(id);
};

module.exports = {
  getChildrenByUserId,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
};
