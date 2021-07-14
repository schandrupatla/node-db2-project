// DO YOUR MAGIC
const express = require("express");
const Cars = require("./cars-model");
const router = express.Router();
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
}= require("./cars-middleware")

router.get('/', async(req, res, next)=>{
    try{
        const cars = await Cars.getAll();
        res.json(cars);
    }
    catch(err){
        next(err);
    }
})

router.get('/:id', checkCarId, (req, res)=>{
        res.json(req.car);
})
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next)=>{
    try{
        const car = await Cars.create(req.body);
        // res.json({...car, id:car.car_id})//initially created idas car_id and the test case 6 was failing. To pass the test case iwrote this and then changed the migration file car_id to id.
        res.json(car)
    }
    catch(err){
        next(err);
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
    if(err.status === -1){
        next();
    }
  });

module.exports = router;
