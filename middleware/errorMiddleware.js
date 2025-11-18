const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    req.flash(
      "error",
      "File size limit exceeded. Max file size is 5 megabytes."
    );
    res.redirect(`/folder/${req.params.id}`);
  } else {
    next();
  }
};

module.exports = { fileSizeLimitErrorHandler };
