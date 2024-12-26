import express from "express"
import {addNewTransaction, deleteLatestTransaction, getAllCars, getAvailableCars, getCarById, getPayment, setAvailable } from "../controllers/user.controllers.js"

const router = express.Router();
router.route('/').get(getAllCars);
router.route('/rent').get(getAvailableCars);
router.route('/newrent').patch(getPayment);
router.route('/deleteRent').delete(setAvailable);
router.route('/payment/:carid').get(getCarById).delete(deleteLatestTransaction);
router.route('/payment/new').post(addNewTransaction)

export default router