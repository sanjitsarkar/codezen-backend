const { Code } = require("../models");
const { handleDeleteCode, decrypt } = require("../utils/codeUtil");
const fetchCodeController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Code.findById(id);

    res.json({ code: result });
  } catch (e) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchCodesController = async (req, res) => {
  try {
    const result = await Code.find({ user_id: req.user.id });
    res.json({ codes: result });
  } catch (e) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchCodesByLanguageController = async (req, res) => {
  const { lang } = req.params;
  try {
    const result = await Code.find({ user_id: req.user.id, lang });
    res.json({ codes: result });
  } catch (e) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const fetchCodesByDateController = async (req, res) => {
  const { sortType } = req.params;
  var upadated_at = "upadated_at";
  if (sortType === "desc") {
    upadated_at = "-upadated_at";
  }

  try {
    const result = await Code.find({ user_id: req.user.id }).sort(upadated_at);

    res.json({ codes: result });
  } catch (e) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};
const deleteCode = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Code.findByIdAndDelete(id);
    res.json({ status: result });
  } catch (e) {
    res.status(404).json({ errors: [err.message.split(",")] });
  }
};

module.exports = {
  fetchCodeController,
  fetchCodesController,
  fetchCodesByDateController,
  fetchCodesByLanguageController,
  deleteCode,
};
