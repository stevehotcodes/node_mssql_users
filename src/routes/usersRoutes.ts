import {Router} from 'express'
import { addUser, getUserById, getUserByName, resetPassword } from '../controllers/usersController'

// import {addUser}from "../controllers/usersControllers"
// addUser



const userRouter=Router()


userRouter.post("",addUser)
userRouter.get("/:username",getUserByName)
userRouter.patch("/reset",resetPassword)
userRouter.get("/user/:id",getUserById)



export default userRouter