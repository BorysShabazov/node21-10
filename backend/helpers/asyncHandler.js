module.exports = (clb) => {
  return async (req, res, next) => {
    try {
      await clb(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
