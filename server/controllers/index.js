const router = require("express").Router();

router.use("/recipes", require("../api/recipes"));
router.use("/categories", require("../api/categories"));

module.exports = router;
