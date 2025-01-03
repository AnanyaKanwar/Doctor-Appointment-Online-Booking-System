import express from "express"
import {
    updateUser, 
    deleteUser, 
    getSingleUser, 
    getAllUsers,
    getAllUserProfile,
    getMyAppointments
} from "../controller/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router=express.Router();

router.get("/:id",authenticate, restrict(['patient']),getSingleUser);
router.get("/",authenticate, restrict(['admin']),getAllUsers);
router.put("/:id",authenticate, restrict(['patient']),updateUser);
router.delete('/:id',authenticate, restrict(['patient']),deleteUser);
router.get('/profile/me',authenticate, restrict(['patient']), getAllUsers);
router.delete('appointments/my-appointments',authenticate, restrict(['patient']),getMyAppointments);


export default router