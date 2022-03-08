import { NextFunction, Response, Request } from "express";
import { isValidClientData } from "../../../library/library.utilities";
import { formatResponse } from "../../../library/library.formatter";
import { selectRecord } from "../../../library/library.database";
import { gatewayTable } from "../../../configs/database";

export const getAllGateways = async (request: Request, response: Response, next: NextFunction) => {

    try {
        const { error, message, data } = await selectRecord(gatewayTable);
        if (error) {
            return formatResponse(response, true, message);
        }
        const clientData: Array<any> = data ? data : null;
        const clientMessage = data.length > 0 ? "Gateway found" : "No gateway found";
        return formatResponse(response, false, clientMessage, clientData);
    } catch (e: any) {
        return formatResponse(response, true, e.message, null);
    }
}

export const getGatewayById = async (request: Request, response: Response, next: NextFunction) => {
    const { valid, message } = isValidClientData(request.params, ["gatewayId"]);
    /**  validate client data*/
    if (!valid) {
        return formatResponse(response, true, message);
    }
    const { gatewayId} = request.params;
    try {
        const { error, message, data } = await selectRecord(gatewayTable, { gatewayId: parseInt(gatewayId) });
        if (error) {
            return formatResponse(response, true, message);
        }
        const clientData: Array<any> = data && data[0] ? data[0] : null;
        const clientMessage = data ? "Gateway found" : "Gateway not found";
        return formatResponse(response, false, clientMessage, clientData);
    } catch (e: any) {
        return formatResponse(response, false, e.message);
    }
}