import express from "express";
/** 
 * load all gateway routes. Routes name  prefix corresponds to the appropriate 
 * `REST` API verb.
 * @Note we can add more verbs to the  one defined at any time
  */
import gatewayRouter from "./router/all.router";

/** 
 * Define router for all the `gateway` endpoint. This will map `http methods`
 * to their corresponding route handlers.
 * 
 * export the router. This will handle all request relating to `gateway`
 * 
 * @example
 * ```bash
 * curl http://domain.com/api/v1/gateway
 * ```
 */
export default gatewayRouter;