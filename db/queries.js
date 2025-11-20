const { get } = require("http");
const prisma = require("../db/prismaClient");

async function createUser(username, password) {
  try {
    console.log("DB Create User:", username);
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        folders: {
          create: [{ name: username }],
        },
      },
    });
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

async function getFoldersByUserId(userId) {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId },
    });
    return folders;
  } catch (err) {
    console.error("Error fetching folders by user ID:", err);
    throw err;
  }
}

async function createFolder(userId, folderName) {
  console.log("DB Create Folder for userId:", userId, "named:", folderName);
  try {
    const newFolder = await prisma.folder.create({
      data: {
        name: folderName,
        user: { connect: { id: userId } },
      },
    });
    return newFolder;
  } catch (err) {
    console.error("Error creating folder:", err);
    throw err;
  }
}
async function getFolderByIdAndUserId(folderId, userId) {
  // console.log("DB Get Folder by ID:", folderId);
  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: userId,
      },
    });
    // console.log("Found folder:", folder);
    return folder ? folder : null;
  } catch (err) {
    console.error("Error getting folder ID by name:", err);
    throw err;
  }
}

async function deleteFolderByNameAndUserId(folderId) {
  try {
    const deletedFolder = await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
    console.log("Deleted folder:", deletedFolder);
    return deletedFolder;
  } catch (err) {
    console.error("Error deleting folder by name and user ID:", err);
    throw err;
  }
}

async function updateFolderName(folderId, newName) {
  try {
    const updatedFolder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name: newName,
      },
    });
    console.log("Updated folder:", updatedFolder);
    return updatedFolder;
  } catch (err) {
    console.error("Error updating folder name:", err);
    throw err;
  }
}

async function createFile(
  userId,
  folderId,
  originalname,
  path,
  mimetype,
  size
) {
  console.log("DB Create File in folderId:", folderId, "for userId:", userId);
  try {
    const newFile = await prisma.file.create({
      data: {
        fileName: originalname,
        path: path,
        mimetype: mimetype,
        size: size,
        user: { connect: { id: userId } },
        folder: { connect: { id: folderId } },
      },
    });
    return newFile;
  } catch (err) {
    console.error("Error creating file:", err);
    throw err;
  }
}

async function getFolderFiles(folderId, userId) {
  try {
    const fileList = await prisma.file.findMany({
      where: {
        folderId: folderId,
        userId: userId,
      },
    });
    return fileList;
  } catch (err) {
    console.error("Error fetching files by folder ID and user ID:", err);
    throw err;
  }
}

async function deleteFileById(fileId) {
  try {
    const deletedFile = await prisma.file.delete({
      where: {
        id: fileId,
      },
    });
    console.log("Deleted file:", deletedFile);
    return deletedFile;
  } catch (err) {
    console.error("Error deleting file by ID:", err);
    throw err;
  }
}

async function getFileByIdAndUserId(fileId, userId) {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
        userId: userId,
      },
    });
    return file;
  } catch (err) {
    console.error("Error fetching file by ID:", err);
    throw err;
  }
}

async function getFolderIdByFileId(fileId) {
  console.log("DB Get Folder ID by File ID:", fileId);
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });
    // console.log("Fetched folder by file ID:", file);
    return file.folderId;
  } catch (err) {
    console.error("Error fetching folder by file ID:", err);
    throw err;
  }
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  getFoldersByUserId,
  createFolder,
  getFolderByIdAndUserId,
  deleteFolderByNameAndUserId,
  updateFolderName,
  createFile,
  getFolderFiles,
  deleteFileById,
  getFileByIdAndUserId,
  getFolderIdByFileId,
};
