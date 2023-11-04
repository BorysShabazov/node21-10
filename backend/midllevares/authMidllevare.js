// отримуємо токен
// розшифровуємо токен
// передає інформацію з токену далі

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");
    if (type === "Bearer" && token) {
      const decodet = jwt.verify(token, "cat");

      req.user = decodet;
      next();
    }
  } catch (error) {
    res.status(401).json({ code: 401, message: error.message });
  }
};

// {
//     students: [ 'Borys', 'Andrii', 'Oksana' ],
//     id: '6546035ade7771556636e0fe',
//     iat: 1699088920,
//     exp: 1699171720
//   }
