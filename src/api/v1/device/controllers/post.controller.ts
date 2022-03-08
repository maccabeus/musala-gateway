import { NextFunction, Response, Request } from "express";
import { isValidClientData, getNextUniqueId, getNextRecordId } from "../../../library/library.utilities";
import { formatResponse } from "../../../library/library.formatter";
import { insertRecord, selectRecord } from "../../../library/library.database";
import { deviceTable } from "../../../configs/database";
import { maxAllowedDevice } from "../../../configs/api";
import { createUUID } from "../../../library/library.crypto";


export const addDevice = async (request: Request, response: Response, next: NextFunction) => {

    const { valid, message } = isValidClientData({ ...request.params, ...request.body }, ["gatewayId", "vendor"]);

    /**  validate if the gateway ID is provided*/
    if (!valid) {
        return formatResponse(response, true, message);
    }
    const { gatewayId } = request.params;
    const { vendor } = request.body;

    /** 
     * default device status to offline if not provided 
     * */
    const status = request.body && request.body.status ? request.body.status : "offline";
    const dateCreated = new Date(Date.now());
    const deviceUID = createUUID();

    const { data } = await selectRecord(deviceTable, { gatewayId: parseInt(gatewayId) });

    if (data && data.length > maxAllowedDevice) {
        return formatResponse(response, true, `Maximum of ${maxAllowedDevice} allowed devices reached`);
    }
    // const deviceId = getNextUniqueId(data, "deviceId");
    const deviceId = await getNextRecordId("devices", true);

    try {
        const postData: any = { gatewayId: parseInt(gatewayId), deviceId, deviceUID, vendor, dateCreated, status };
        const insertRecordData: any = await insertRecord(deviceTable, postData);
        const { error, message } = insertRecordData;
        if (error) {
            return formatResponse(response, true, message);
        }
        const clientMessage = "Device saved";
        return formatResponse(response, false, clientMessage, postData);
    } catch (e: any) {
        return formatResponse(response, true, e.message, null);
    }
}