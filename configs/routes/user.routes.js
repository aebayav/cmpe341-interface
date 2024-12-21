import express from "express"
import { addNewRent, getAllCars, getAvailableCars } from "../controllers/user.controllers.js"

const router = express.Router();
router.route('/').get(getAllCars);
router.route('/rent').get(getAvailableCars);
router.route('/paymentSuccess').patch(addNewRent);

export default router