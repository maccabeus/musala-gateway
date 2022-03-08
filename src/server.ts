import express, { Express, RequestHandler, Request, NextFunction, Response } from "express";
import cors from "cors";

import dotEnv from "dotenv";
import serverRouter from "./server.router";

/** create an express application */
const app: Express = express();
/** 
 * The main server router. Handles all server routing All required
 *  router within the application are declared in this module
 * */
dotEnv.config();
const port: number | string = process.env.PORT || 4000;

/** application host */
const host: string = process.env.HOST || "http://localhost";
/** 
 * Get the api route on the server 
 * */
const apiPath: string | null = process.env.API_PATH || null;
/** 
 * Get the default api version to use. User can also provide the version to use via the url route .
 * This value default to what is defined in the `.env` file of the current application  `environment` 
 * 
 * @usage 
 * Route could be passed in the format `https:domain.com/api/v1`. This route will call the version 1 of the API
 * API versioning default to `v1` which will always be available even if the `environment variables` are not set
 * */
let apiVersion: string = process.env.API_CURRENT_VERSION || "v1";
/**
 * API user must provide a valid `APi version`. The default of loaded from the `.env` file
 */
if (!apiPath || !apiVersion) {
    throw new Error("Invalid API path");
}

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(cors() as RequestHandler);

/** 
 * use specific route based on the provide `API version` and `apiPath`
 *  */
app.use(`/${apiPath}/${apiVersion}/`, serverRouter);

/**
 * Process default server error here
 */
app.get("*", (request: Request, response: Response, next: NextFunction) => {
    response.setHeader("status", "404");
})

app.listen(port, () => {
    console.log(`Server running on ${host}:${port}/${apiPath}/${apiVersion}`)
})

/* // */