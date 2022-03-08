import { NextFunction, Response, Request } from "express";
import { isValidClientData } from "../../../library/library.utilities";
import { formatResponse } from "../../../library/library.formatter";
import { deleteRecord } from "../../../library/library.database";
import { gatewayTable } from "../../../configs/database";


export const deleteGateway = async (request: Request, response: Response, next: NextFunction) => {
    const { valid, message } = isValidClientData(request.params, ["gatewayId"]);

    if (!valid) {
        return formatResponse(response, true, message);
    }
    const { gatewayId } = request.params;
    try {
        const deleteResult = await deleteRecord(gatewayTable, { gatewayId: parseInt(gatewayId)});
        const { error, message, data } = deleteResult;
        if (error) {
            return formatResponse(response, true, message);
        }
        const { deletedCount } = data;
        const clientMessage = deletedCount > 0 ? "Gateway deleted" : "Could not delete gateway"
        return formatResponse(response, false, clientMessage, data);
    } catch (e: any) {
        return formatResponse(response, true, message);
    }
}