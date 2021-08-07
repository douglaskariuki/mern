import express from 'express';
import userController from "./../controllers/user.contoller"
import authController from "./../controllers/auth.controller"

const router = express.Router();

router.route("/api/users")
    .get(userController.list)
    .post(userController.create)

router.param('userId', userController.userByID)

router.route("/api/users/:userId")
    .get(authController.requireSignin, userController.read)
    .put(authController.requireSignin, authController.hasAuthorization, userController.update)
    .delete(authController.requireSignin, authController.hasAuthorization, userController.remove)



export default router;