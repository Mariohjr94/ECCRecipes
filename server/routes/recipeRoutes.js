const authenticateToken = require("../middleware/authenticateToken");

router.get("/mine", authenticateToken, controller.getMyRecipes);
