import express from "express"
import { addNewRent, deleteRent, getAllCars, getAvailableCars, getCarById } from "../controllers/user.controllers.js"

const router = express.Router();
router.route('/').get(getAllCars);
router.route('/rent').get(getAvailableCars);
router.route('/newrent').patch(addNewRent);
router.route('/deleteRent').delete(deleteRent);
router.route('/:id').get(getCarById);

export default router