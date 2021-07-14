const db = require("../../data/db-config");

const getAll = async() => {
  const cars = await db('cars');
  return cars;
}

const getById = async (id) => {
  const car = await db('cars')
    .where('id', id)
    .first()
    return car;
}

const create = async(car) => {
  const [id] = await db('cars')
  .insert(car)
  //console.log("id:",id);
  const newCar = await getById(id);
  console.log("car:",newCar);
  return newCar;
}

const getByVin = async (vin) => {
  const car = await db('cars')
    .where('vin', vin)
    .first()
    return car;
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}