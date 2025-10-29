async function getIndex(req, res) {
  res.render("index", { title: "File Uploader" });
}

module.exports = {
  getIndex,
};
