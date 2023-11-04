const carsController = require("../controllers/CarsController");
const authMidllevare = require("../midllevares/authMidllevare");
const isValidId = require("../midllevares/isValidId");
const rolesMiddlevare = require("../midllevares/rolesMiddlevare");
const validateBody = require("../midllevares/validateBody");
const carSchema = require("../schemas/carSchema");

// Cannot GET /api/v1/cars
const carsRoutes = require("express").Router();
// додати машину
carsRoutes.post("/cars", validateBody(carSchema), carsController.add);
// отримати усі машини
// ["ADMIN", "MODERATOR"]
carsRoutes.get("/cars", authMidllevare, rolesMiddlevare(["CTO","ADMIN", "MODERATOR"]), carsController.getAll);
// отримати одну машину
carsRoutes.get("/cars/:id", isValidId, carsController.getOne);
// оновити машину
carsRoutes.put("/cars/:id", isValidId, carsController.update);
// видалити машину
carsRoutes.delete("/cars/:id", isValidId, carsController.remove);

module.exports = carsRoutes;
// id може перебувати в 3 станах
// валідний існуючий
// валідний не існуючий
// не валідний
