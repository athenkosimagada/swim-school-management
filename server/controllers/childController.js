const childService = require("../services/childService");

const getChildrenByUserId = async (req, res) => {
  try {
    const children = await childService.getChildrenByUserId(req.params.id);
    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChildById = async (req, res) => {
  try {
    const child = await childService.getChildById(req.params.id);
    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createChild = async (req, res) => {
  try {
    const child = await childService.createChild(req.body);
    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateChild = async (req, res) => {
  try {
    const child = await childService.updateChild(req.params.id, req.body);
    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChild = async (req, res) => {
  try {
    await childService.deleteChild(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getChildrenByUserId,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
};
