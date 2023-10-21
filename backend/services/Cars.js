const CarModel = require("../models/Car");

class CarService {
  getAll = async () => {
    const cars = await CarModel.find({});
    return cars;
  };
  add = async (data) => {
    const car = await CarModel.create({ ...data });
    return car;
  };
}

module.exports = new CarService();
