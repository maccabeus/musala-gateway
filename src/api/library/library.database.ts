import { MidoDb } from "./../../api/library/db-manager/mido.db";


let database: any = null;
let databaseType: string | null = null;

/**
 * Select record from a database
 * @param baseTable The base table to select from
 * @param query The query to use for record selection
 * @param type  The tpe of database we are connecting to. Defaults to `mongodb`
 * @returns 
 */
export const selectRecord = async (baseTable: string, query: any = null, dbType: string = "mongodb") => {

    const database = createDatabaseInstance();
    try {
        await database.init(dbType);
        const record = await database.selectRecord(baseTable, query);
        const message = record.length > 0 ? "Record found" : "No record found";
        database.close();
        return databaseResponse(false, message, record)
    } catch (err: any) {
        return databaseResponse(true, err.message);
    }
}

/**
 * Insert a new record into database
 * @param baseTable The base database table to insert record in
 * @param record The record(s) to insert
 * @param insertMany If `true`, will enable multiple record insertion
 * @param type The type of database we are using. default to `mongodb`
 * @returns 
 */
export const insertRecord = async (baseTable: string, record: any, insertMany: boolean = false, dbType: string = "mongodb") => {

    const database = createDatabaseInstance();

    try {
        await database.init(dbType);
        const insertStatus = await database.insertRecord(record, baseTable);
        database.close();
        return databaseResponse(false, null, insertStatus)
    } catch (err: any) {
        return databaseResponse(true, err.message, null)
    }
}

/**
 * 
 * @param baseTable The table to connect to
 * @param record The updated  record to value 
 * @param where The where clause to use for record update
 * @param autoAdd Adds new record if one not available
 * @param dbType 
 * @returns 
 */
export const updateRecord = async (baseTable: string, record: any, where: any, autoAdd: boolean = false, dbType: string = "mongodb") => {
    const database = createDatabaseInstance();
    try {
        await database.init(dbType);
        const updateStatus = await database.updateRecord(baseTable, record, where, autoAdd);
        database.close();
        return databaseResponse(false, null, updateStatus)
    } catch (err: any) {
        console.log(err, "update error")
        return databaseResponse(true, err.message, null)
    }
}

/**
 * Delete an existing record
 * @param baseTable The table to connect to
 * @param record The updated  record to value 
 * @param where The where clause to use for record update
 * @param autoAdd Adds new record if one not available
 * @returns 
 */
export const deleteRecord = async (baseTable: string, where: any, dbType: string = "mongodb") => {
    const database = createDatabaseInstance();
    try {
        await database.init(dbType);
        const details = await database.deleteRecord(baseTable, where);
        database.close();
        return databaseResponse(false, null, details)
    } catch (err: any) {
        console.log(err, "update error")
        return databaseResponse(true, err.message, null)
    }
}

/**
 * --------------------------------------------------------------------------------------------------
 * ----------------------------------------- Private Functions --------------------------------------
 * --------------------------------------------------------------------------------------------------
 */

/**
 * Create a local instance of the database
 * @returns 
 */
const createDatabaseInstance = () => {
    database = !database ? new MidoDb() : database;
    return database;
}

/**
 * Return a response from the database call. All method must use this interface to return values to `caller`
 * @param error Raise error or not. default to `false`
 * @param data The data to return back to the calling function.
 * @param message The message to return. Default to `null`
 * @returns 
 */
const databaseResponse = (error: boolean, message: string | null = null, data: any = null) => {
    return { error, message, data };
}