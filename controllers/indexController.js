const queries = require("../db/queries");
const bcryptjs = require("bcryptjs");
const passport = require("../config/passport");
const { post } = require("../routes/indexRouter");
const { folder } = require("../db/prismaClient");
// require("../config/passport.js");

// async function selectFolder(req, res) {
//   const folderName = req.params.name;
//   const userId = req.user.id;
//   console.log("selectFolder called for folder:", folderName, "userId:", userId);
//   // get folder id from name and userId
//   const folder = await queries.getFolderByNameAndUserId(userId, folderName);
//   // get folders for sidebar
//   const folders = await queries.getFoldersByUserId(userId);
//   // render index with selected folder
//   res.render("index", {
//     title: "File Uploader",
//     user: req.user,
//     folders: folders,
//     selectedFolder: folder,
//   });
// }

async function welcomePage(req, res) {
  if (req.isAuthenticated()) {
    console.log("Authenticated user");
    res.redirect("/directory");
  } else {
    console.log("Unauthenticated user");
    res.render("welcome", { title: "Welcome" });
  }
}

async function getIndex(req, res) {
  const userId = req.user ? req.user.id : null;
  // console.log("getIndex req.params.id:", req.params.id);
  const folderId = Number(req.params.id);
  // console.log("getIndex folderId:", folderId);
  try {
    // get folders
    const folders = await queries.getFoldersByUserId(userId);
    // get selected folder, if any
    let selectedFolder = null;
    if (folderId > 0) {
      selectedFolder = await queries.getFolderByIdAndUserId(folderId, userId);
    }
    // console.log("getIndex selectedFolder:", selectedFolder);
    res.render("index", {
      title: "File Uploader",
      user: req.user,
      folders: folders,
      selectedFolder: selectedFolder,
    });
  } catch (err) {
    console.error("Error getIndex:", userId, folderName, err);
  }
}

async function getRegister(req, res) {
  res.render("register", { title: "Register" });
}

async function postRegister(req, res) {
  const { username, password } = req.body;
  console.log("postRegister:", username, password);
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    const newUser = await queries.createUser(username, hashedPassword);
    req.flash("success", "Registered successfully. Please log in.");
    res.status(201).redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error", "Registration failed. Please try again.");
    return next(err);
  }
}

async function postLogin(req, res, next) {
  // const { username, password } = req.body;
  console.log("postLogin called", req.body);
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
}

async function getLogout(req, res) {
  req.logout((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return next(err);
    } else {
      req.flash("success", "Logged out successfully.");
      res.redirect("/");
    }
  });
}

async function postNewFolder(req, res) {
  console.log(
    "postNewFolder userId:",
    req.user.id,
    "named:",
    req.body.folderName
  );
  try {
    const newFolder = await queries.createFolder(
      req.user.id,
      req.body.folderName
    );
    req.flash("success", "Folder created successfully.");
    res.status(201).redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error", "Folder creation failed. Please try again.");
    return next(err);
  }
}

async function postDeleteFolder(req, res) {
  console.log(
    "postDeleteFolder called userId:",
    req.user.id,
    "folder:",
    req.params.id
  );
  const idString = req.params.id;
  const idInt = Number(idString);
  // delete folder from db, prompt to delete?
  try {
    await queries.deleteFolderByNameAndUserId(idInt);
    req.flash("success", "Folder deleted successfully.");
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting folder:", err);
    req.flash("error", "Folder deletion failed. Please try again.");
    return next(err);
  }
}

async function getEditFolder(req, res) {
  console.log(
    "getEditFolder called userId:",
    req.user.id,
    "folder:",
    req.params.name
  );
  // render edit folder page
}

async function postEditFolder(req, res) {
  console.log("postEditFolder called");
  // update db with new folder info
}

module.exports = {
  welcomePage,
  getIndex,
  getRegister,
  postRegister,
  postLogin,
  getLogout,
  postNewFolder,
  postDeleteFolder,
  getEditFolder,
  postEditFolder,
};
