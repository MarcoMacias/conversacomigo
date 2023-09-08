import { adaptRoute } from "@core/logic/adapters/ExpressRouteAdapter";
import express from "express";
import { makeActivateUserController } from "../factories/makeAuthenticateController";



const Admin = express.Router()


Admin.get("/auth", adaptRoute(makeActivateUserController()));


export { Admin };