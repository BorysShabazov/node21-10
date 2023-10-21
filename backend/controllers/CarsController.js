const asyncHandler = require("../helpers/asyncHandler");
const CarModel = require("../models/Car");
const CarService = require("../services/Cars");

class CarsController {
  // add = asyncHandler(async (req, res) => {
  //   const { title, price } = req.body;
  //   if (!title || !price) {
  //     res.status(400);
  //     throw new Error("Provide all required fils");
  //   }
  //   const car = await CarModel.create({ ...req.body });
  //   res.status(201).json({ code: 201, message: "ok", data: car });
  // });

  add = asyncHandler(async (req, res) => {
    const { title, price } = req.body;
    if (!title || !price) {
      res.status(400);
      throw new Error("Provide all required fils");
    }
    // const car = await CarModel.create({ ...req.body });
    const car = await CarService.add(req.body);
    if (!car) {
      return res.status(400).json({ code: 400, message: `Unable to add car` });
    } else {
      return res.status(201).json({ code: 201, message: "ok", data: car });
    }
  });

  // getAll = asyncHandler(async (req, res) => {
  //   const cars = await CarModel.find({});
  //   res
  //     .status(200)
  //     .json({ code: 200, message: "ok", data: cars, qty: cars.length });
  // });

  getAll = asyncHandler(async (req, res) => {
    // const cars = await CarModel.find({});
    const cars = await CarService.getAll();
    if (!cars) {
      return res
        .status(400)
        .json({ code: 400, message: `Unable to fatch cars` });
    }
    return res
      .status(200)
      .json({ code: 200, message: "ok", data: cars, qty: cars.length });
  });

  getOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const car = await CarModel.findById(id);
    if (!car) {
      res.status(404).json({ code: 404, message: `Car by ${id} not found` });
    }
    res.status(200).json({ code: 200, message: "ok", data: car });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const car = await CarModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!car) {
      res.status(404).json({ code: 404, message: `Car by ${id} not found` });
    }
    res.status(200).json({ code: 200, message: "ok", data: car });
  });

  remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const car = await CarModel.findByIdAndRemove(id);
    if (!car) {
      res.status(404).json({ code: 404, message: `Car by ${id} not found` });
    }
    res.status(200).json({ code: 200, message: "ok", data: car });
  });
}

module.exports = new CarsController();
