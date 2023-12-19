const express = require("express");
const {
  signUpUser,
  loginUser,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
//   changeUserPassword,
//   forgotPassword,
//   passwordReset,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.get("/all/:id", getOneUser);
router.delete("/delete/:id", deleteUser);
router.put("/edit/:id", updateUser);
// router.get("/info/:id", getOneUser);
// router.post("/password", changeUserPassword);
// router.post("/forgot", forgotPassword);
// router.post("/reset", passwordReset);

module.exports = router;


