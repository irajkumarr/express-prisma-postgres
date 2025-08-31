const prisma = require("./../db");
const bcrypt = require("bcryptjs");

//create user
const handleCreateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res
      .status(201)
      .json({ status: true, message: "User Created successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};
//get all user
const handleGetUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
//get user by id
const handleGetUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const { password, ...others } = user;
    res.status(200).json({ ...others });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
//update user
const handleUpdateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    res.status(200).json({ status: true, message: "User Updated!" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
//delete user
const handleDeleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ status: true, message: "User deleted" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  handleCreateUser,
  handleGetUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
};
