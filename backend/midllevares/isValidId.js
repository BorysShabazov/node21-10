const { isValidObjectId } = require("mongoose");
module.exports = (req, res, next) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    return next();
  }
  return res.status(400).json({ code: 400, message: `${id} is not valid` });
};
