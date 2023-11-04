const jwt = require('jsonwebtoken')
module.exports = (rolesArray) => {
	return (req, res, next) => {
  try {
			const { roles } = req.user;
			console.log(roles);
			console.log(rolesArray);
			let hasRole = false;
			roles.forEach(role => {
				if (rolesArray.includes(role)) {
					hasRole = true;
				}
			})
			if (!hasRole) {
				res.status(404).json({ code: 404, message: "Access denied"})
			}

      next();
  } catch (error) {
    res.status(404).json({ code: 404, message: error.message });
  }
	}
};
// {
//   students: [ 'Borys', 'Andrii', 'Oksana' ],
//   id: '65461c9f9046c7b8a1668266',
//   roles: [ 'ADMIN' ],
//   iat: 1699093845,
//   exp: 1699176645
// }
