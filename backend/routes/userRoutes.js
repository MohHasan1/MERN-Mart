import express from "express";
import  { loginUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser} from "../controllers/userController.js";
import { protect, admin } from "../middleware/loginMiddleware.js";

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/login', loginUser);
router.route('/profile').put(protect, updateUserProfile).get(protect, getUserProfile);
router.route('/:id').put(protect, admin,updateUser).get(protect, admin,getUserById).delete(protect, admin,deleteUser);


export default router; 