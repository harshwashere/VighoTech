import { Router } from "express";
import { login, register } from "../controllers/user-controller.js";

const route = Router()

route.post('/login', login)
route.post('/register', register)

export default route