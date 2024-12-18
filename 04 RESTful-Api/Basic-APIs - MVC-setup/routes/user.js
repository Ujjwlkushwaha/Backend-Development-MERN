const express = require("express");
const userData = require("../MOCK_DATA.json");
const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../Controllers/user.controller");

const router = express.Router();


//✅ Get all users--------------------------------------------
router.get("/", (req, res) => {
  res.json(userData);
});

// ✅ create new user-----------------------------------------
router.route("/").post(createUser);

router
  .route("/:id")
  .get(getUser) // ✅ get individual user information--------
  .patch(updateUser) // ✅ edit user information  --------------
  .delete(deleteUser); // ✅ delete user information --------------


module.exports = router;