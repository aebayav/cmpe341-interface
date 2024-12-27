import express from "express"
import {addCar, addNewTransaction, changeRentDate, deleteCar, deleteLatestTransaction, getAllCars, getAvailableCars, getCarById, getPayment, getUnavailableCars, setAvailable } from "../controllers/user.controllers.js"

const router = express.Router();
router.route('/').get(getAllCars);
router.route('/rent').get(getAvailableCars);
router.route('/newrent').patch(getPayment);
router.route('/setAvailable').post(setAvailable);
router.route('/payment/:carid').get(getCarById).delete(deleteLatestTransaction);
router.route('/payment/new').post(addNewTransaction)
router.route('/delete').get(getUnavailableCars)
router.route('/admin').get(getAllCars);
router.route('/admin/add').post(addCar);
router.route('/admin/delete').delete(deleteCar);
router.route('/update').post(changeRentDate);


export default router