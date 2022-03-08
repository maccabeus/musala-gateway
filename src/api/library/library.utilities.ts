import { selectRecord, updateRecord } from "./library.database";

export interface ConvertHyphenToCamelInterface {
    /** this will allow us to assign properties at runtime */
    [propName: string]: any
}

export type ConvertHyphenToCamelTypeCasting = {
    [propName: string]: string
}

export interface ValidatorResponse {
    valid: boolean
    message: string
    data?: any
}

/**
 * Validate if client data provided contains all 
 * @param data The client data provided.
 * @param list An array list of `key indexes` to validate. This will map to a `key value` in the `data` param
 * @returns  {ValidatorResponse} instance
 */
export const isValidClientData = (data: any, list: Array<string> | Array<{ key: string, message?: string }>): ValidatorResponse => {

    /** the base notification message  */
    const baseMessage = "must be provided";

    const validatorResponse = (valid: boolean, message: string, data: any = null) => {
        return ({ valid, message, data });
    }

    for (let value of list) {
        if (typeof value === "string") {
            /** User only passed in string  key of list */
            if (!data[value] || data[value] == undefined || data[value] == "") {
                /** return an error */
                return validatorResponse(false, `'${value}' ${baseMessage}`)
            }
        } else if (typeof value === "object") {
            const { key, message } = value;
            let customMessage = message ? message : `${key} ${baseMessage}`;
            if (!data[key]) {
                return validatorResponse(false, customMessage)
            }
        }
    }
    /** return true if all validation passed */
    return validatorResponse(true, "validation successful")
}

/**
 * Get the next unique ID of a document
 * @param data array of data
 * @returns  {number} the next uniqueId for a record
 */
export const getNextUniqueId= (data: Array<any>, indexKey: string): number => {
    if (!data || data.length <= 0) return 1;
    const lastItem = data[data.length - 1];
    return lastItem && lastItem[indexKey] ? parseInt(lastItem[indexKey]) + 1 : 1;
}

export const getNextRecordId = async (indexTable: string, autoSaveIncrement: boolean = true, counterTable: string = "counter"): Promise<number> => {
    let query: any = { table: indexTable };
    const { data } = await selectRecord(counterTable, query);
    let counter: number = (!data || !data[0]) ? 1 : parseInt(data[0].counter) + 1
    if (autoSaveIncrement) {
        const updateResult = await updateRecord(counterTable, { counter }, query, true);
    }
    return counter;
}

/**
 * Validate if an IP address string is valid
 * @param address IP address to validate
 * @returns {boolean} true if the IP is a valid IP4 address
 */
export const isValidIpAddress = (address: string): boolean => {
    const ipMatcher = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipMatcher.test(address);
}