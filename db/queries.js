const prisma = require("../db/prismaClient");

async function createUser(username, password) {
  try {
    console.log("DB Create User:", username);
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    // call to create user folder her?
    return newUser;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
}

async function findUserByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  } catch (err) {
    console.error("Error finding user by username:", err);
    throw err;
  }
}

async function findUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (err) {
    console.error("Error finding user by ID:", err);
    throw err;
  }
}

// async function createFolder();

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
};
