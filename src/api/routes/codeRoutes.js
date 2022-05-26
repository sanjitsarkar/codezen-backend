const express = require("express");
const compileCodeController = require("../controllers/compileCodeController");
const saveCodeController = require("../controllers/saveCodeController");
const { deleteCode } = require("../controllers/codeController");
const router = express.Router();
const { isAuthenticated } = require("../middlewares");
const {
  getCodeController,
  getCodesController,
  searchCodesController,
  toggleSharing,
} = require("../controllers/getCodeController");
router.use(isAuthenticated);
router.post("/compile", compileCodeController);
router.post("/save", saveCodeController);

router.get("/:id", getCodeController);
router.delete("/:id", deleteCode);
router.get("/", getCodesController);
router.post("/", searchCodesController);
router.post("/:id", toggleSharing);

module.exports = router;
