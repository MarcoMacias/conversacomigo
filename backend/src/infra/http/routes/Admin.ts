/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { adaptRoute } from "@core/logic/adapters/ExpressRouteAdapter";
import express from "express";
import { makeAuthenticateController } from "../factories/makeAuthenticateController";
import { adaptMiddleware } from "@core/logic/adapters/ExpressMiddlewareAdapter";
import { makeAuthenticationMiddleware } from "../factories/middlewares/makeAuthenticationMiddleware";
import { makeGetActiveRoomsController } from "../factories/makeGetActiveRoomsController";
import { makeGetRoomMessages } from "../factories/makeGetRoomMessages";
import { makeBanUserController } from "../factories/makeBanUserController";

const Admin = express.Router();

Admin.get("/auth", adaptRoute(makeAuthenticateController()));
Admin.get(
  "/rooms",
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeGetActiveRoomsController())
);
Admin.get(
  "/rooms/:roomId/messages",
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeGetRoomMessages())
);

Admin.put(
  "/users/:userId/ban",
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeBanUserController())
);

export { Admin };
