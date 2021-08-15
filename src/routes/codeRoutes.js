const express = require("express")
const compileCodeController = require("../controllers/compileCodeController")
const saveCodeController = require("../controllers/saveCodeController")
const { deleteCode} = require("../controllers/codeController")
const router = express.Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const {getCodeController,getCodesController,searchCodesController, toggleSharing} = require("../controllers/getCodeController")
router.use(isAuthenticated)
router.post("/compile", compileCodeController)
// router.get("/compile", (req,res) => { res.send("compile") })
router.post("/save",saveCodeController)

router.get("/code/:id",getCodeController)
router.delete("/code/:id",deleteCode)
router.get("/codes",getCodesController)
router.post("/codes",searchCodesController)
router.post("/code/:id",toggleSharing)

module.exports = router