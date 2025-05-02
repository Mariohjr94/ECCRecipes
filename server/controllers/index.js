const router = require("express").Router();

router.use("/recipes", require("./recipes"));
router.use("/categories", require("./categories"));
router.use("/freezer-items", require("./freezerItems"));
router.use("/freezer-categories", require("./freezerCategories"));

module.exports = router;
