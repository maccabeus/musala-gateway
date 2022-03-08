
import { NextFunction, Response } from "express";
import { Request } from "express";
import express from "express";
import gatewayRouter from "./api/v1/gateway/index";
import deviceRouter from "./api/v1/device/index";
/** 
 * create a `serverRouter` to handle app wide routing mechanism
 * This router will map each `API` request the corresponding  `API endpoint`.
 * @Note Any router not handled within this module will not be available 
 * */
const serverRouter = express.Router();
/**
 * Import all the available routers from each module locations.
 * @example To use the `user` router, we will import the routes like this:
 * 
 * ```ts
 * const userRouter= require(".api/v1/user/index")
 * ```
 * @Note The above is assuming we are using `v1` of the api
 */

/** The default api page is shown here */
serverRouter.get("", (request: Request, response: Response, next: NextFunction) => {
    response.end("API Working");
})
/**
 * Each api endpoint will be mapped to their corresponding  router
 * @example
 * 
 * ```js
 * node-fetch("http://domain.com/api/gateway") 
 * ```
 * @Note we use the same implementation across the entire application
 */
serverRouter.use("/gateway", gatewayRouter);
/**
 * Map all `devices request` to the `devices router` controllers
 */
serverRouter.use("/devices", deviceRouter);
/** 
 * default API error management is defined here
 *  */
serverRouter.use("*", (request: Request, response: Response) => {
    // response.setHeader("status", "404");    
    response.end("NOT FOUND");
})

export default serverRouter;