
import { NextFunction, Response, Request } from "express";

export const updateGateway= async (request: Request, response: Response, next: NextFunction) =>{
    const {id}= request.params;
    /**@todo implement person update */
}
