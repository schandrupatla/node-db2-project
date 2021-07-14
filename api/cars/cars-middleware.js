const db = require("./cars-model");
var vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const car = await db.getById(req.params.id);
    if (!car) {
      next({
        status: 404,
        message: `car with id ${req.params.id} is not found`,
      });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const fieldNames = ["vin", "make", "model", "mileage"];
  const error = { status: 400 };
  fieldNames.forEach((field) => {
    if (req.body[field] === null || req.body[field] === undefined) {
      error.message = `${field} is missing`;
    }
  });
  if (error.message) {
    next(error);
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  var isValidVin = vinValidator.validate(req.body.vin); // true
  if (isValidVin) {
    next();
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`,
    });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existing = await db.getByVin(req.body.vin);
    if (existing) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

//using foreach
// const checkVinNumberUnique = async (req, res, next) => {
//     const cars = await db.getAll();
//     cars.forEach(car => {
//       if(car.vin === req.body.vin){
//         return res.status(400).json({message: `vin ${req.body.vin} already exists`})
//     }
//   })
//   next();
// }

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
