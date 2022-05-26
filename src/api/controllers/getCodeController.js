const { Code } = require("../models");
const getCodeController = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.json({ status: "Invalid ID" });
    }
    const _code = await Code.findOne({ _id: id });
    if (!_code) res.json({ status: "Wrong ID" });
    res.json(_code);
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: [e.message.split(",")] });
  }
};
const getCodesController = async (req, res) => {
  try {
    const _codes = await Code.find({ user_id: req.user.id });
    if (!_codes) res.json({ status: "Wrong ID" });
    res.json(_codes);
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: [e.message.split(",")] });
  }
};
const toggleSharing = async (req, res) => {
  const { id } = req.params;
  const { share } = req.body;

  try {
    const _codes = await Code.updateOne(
      { _id: id, user_id: req.user.id },
      { share }
    );
    if (!_codes) res.json({ status: "Wrong ID" });
    res.json(_codes);
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: [e.message.split(",")] });
  }
};

const searchCodesController = async (req, res) => {
  const { search } = req.body;
  console.log("search", search);
  try {
    let _search = `\\${search}\\`;
    //  _search = new RegExp("^d$",'i')
    const codes = await Code.find({
      user_id: req.user.id,
      $text: { $search: _search, $caseSensitive: false },
    });
    console.log("codes", codes);
    if (!codes) res.json({ status: "Wrong ID" });
    res.json(codes);
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: [e.message.split(",")] });
  }
};
module.exports = {
  getCodeController,
  getCodesController,
  searchCodesController,
  toggleSharing,
};
