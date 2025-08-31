const express = require("express");
const router = express.Router();

const {
  handleCreateUser,
  handleGetUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
} = require("./../controllers/userController");
router.post("/", handleCreateUser);
router.get("/", handleGetUser);
router.get("/:id", handleGetUserById);
router.put("/:id", handleUpdateUser);
router.delete("/:id", handleDeleteUser);

module.exports = router;
