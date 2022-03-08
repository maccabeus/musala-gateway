
import { NextFunction, Response, Request } from "express";
import { getNextRecordId, getNextUniqueId, isValidClientData, isValidIpAddress } from "../../../library/library.utilities";
import { formatResponse } from "../../../library/library.formatter";
import { insertRecord, selectRecord } from "../../../library/library.database";
import { gatewayTable } from "../../../configs/database";

export const addGateway = async (request: Request, response: Response, next: NextFunction) => {

    const { valid, message } = isValidClientData(request.body, ["ip", "serialNumber", "gatewayName"]);
    /**
     * validate all required request data
     */
    if (!valid) {
        return formatResponse(response, true, message);
    }

    const { ip, serialNumber, gatewayName } = request.body;

    // const { data } = await selectRecord(gatewayTable, { serialNumber, ip });
    const { data } = await selectRecord(gatewayTable);

    // if (data && data.length > 0) {
    if (data && data.find((gateway: any) => gateway.ip === ip && gateway.serialNumber === serialNumber)) {
        return formatResponse(response, true, `${gatewayName} already added. You can delete first`);
    }
    /**
     * Validate IP address provided
     */
    if (!isValidIpAddress(ip)) {
        const message = "Invalid IP Address provided";
        return formatResponse(response, true, message);
    }
    /**
     * Generate the next possible unique `gatewayId` for this new gateway
     * @note this new gatewayId is always increasing even when items are deleted 
     */
    // const gatewayId = getNextUniqueId(data, "gatewayId");
    const gatewayId = await getNextRecordId("gateways", true);

    try {
        const postData: any = { gatewayId, ip, serialNumber, gatewayName };
        const insertRecordData: any = await insertRecord(gatewayTable, postData);
        const { error, message } = insertRecordData;
        if (error) {
            return formatResponse(response, true, message);
        }
        const clientMessage = "Gateway saved";
        return formatResponse(response, false, clientMessage, postData);
    } catch (e: any) {
        return formatResponse(response, true, e.message, null);
    }
}