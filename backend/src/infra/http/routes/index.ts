import { Router } from "express"
import { Admin } from "./Admin";


const router = Router();


router.use("/admin", Admin)



export { router };