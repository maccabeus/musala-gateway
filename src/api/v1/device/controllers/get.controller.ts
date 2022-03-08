import { NextFunction, Response, Request } from "express";
import { isValidClientData } from "../../../library/library.utilities";
import { formatResponse } from "../../../library/library.formatter";
import { selectRecord } from "../../../library/library.database";
import { deviceTable } from "../../../configs/database";

/**
 * Get all the devices added to a gateways
 * 
 * @param request request instance
 * @param response response instance
 * @param next 
 * @returns  {Array} returns an array list of devices
 */
export const getAllDevicesByGateway = async (request: Request, response: Response, next: NextFunction) => {

    const { valid, message } = isValidClientData(request.params, ["gatewayId"]);

    /**  validate client data*/
    if (!valid) {
        return formatResponse(response, true, message);
    }
    const { gatewayId } = request.params;

    try {
        const { error, message, data } = await selectRecord(deviceTable, { gatewayId: parseInt(gatewayId) });
        if (error) {
            return formatResponse(response, true, message);
        }
        const clientData: Array<any> = data ? data : null;
        const clientMessage = data.length > 0 ? "Device found" : "No device found";
        return formatResponse(response, false, clientMessage, clientData);
    } catch (e: any) {
        return formatResponse(response, true, e.message, null);
    }
}

/**
 * Get the a specific  device added to a gateway
 * @param request 
 * @param response 
 * @param next 
 * @returns 
 */
export const getDeviceById = async (request: Request, response: Response, next: NextFunction) => {

    const { valid, message } = isValidClientData(request.params, ["gatewayId", "deviceId"]);
    /**  validate client data*/
    if (!valid) {
        return formatResponse(response, true, message);
    }
    const { gatewayId, deviceId } = request.params;
    try {
        const { error, message, data } = await selectRecord(deviceTable, { gatewayId: parseInt(gatewayId), deviceId: parseInt(deviceId) });
        if (error) {
            return formatResponse(response, true, message);
        }
        const clientData: Array<any> = data && data[0] ? data[0] : null;
        const clientMessage = data ? "Device found" : "No device found";
        return formatResponse(response, false, clientMessage, clientData);
    } catch (e: any) {
        return formatResponse(response, false, e.message);
    }
}