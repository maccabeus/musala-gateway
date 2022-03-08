import { NextFunction, Response, Request } from "express";
import { isValidClientData } from "../../../library/library.utilities";
import { formatResponse } from "../../../library/library.formatter";
import { deleteRecord } from "../../../library/library.database";
import { deviceTable } from "../../../configs/database";


export const deleteDevice = async (request: Request, response: Response, next: NextFunction) => {

    const { valid, message } = isValidClientData(request.params, ["gatewayId", "deviceId"]);

    /**  validate client data*/
    if (!valid) {
        return formatResponse(response, true, message);
    }
    const { deviceId, gatewayId } = request.params;
    try {
        const deleteResult = await deleteRecord(deviceTable, { gatewayId: parseInt(gatewayId), deviceId: parseInt(deviceId) });
        const { error, message, data } = deleteResult;
        if (error) {
            return formatResponse(response, true, message);
        }
        const { deletedCount } = data;
        const clientMessage = deletedCount > 0 ? "Device deleted" : "Could not delete device"
        return formatResponse(response, false, clientMessage, data);
    } catch (e: any) {
        return formatResponse(response, true, message);
    }
}