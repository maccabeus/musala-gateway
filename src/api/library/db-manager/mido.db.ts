/*
    This file create the database object for connection
 */
import settings from "../../configs/database";

export class MidoDb {

    // define private properties
    baseDbType: string = "mongoDb";
    baseConn: string | null = null;
    dbType: string | null = null;
    db: string | null = null;
    dbConfigIndex: string | null = null;
    dbClient: any = null;
    conn = null;
    connUri: string | null = null;

    /* add supported db to an array of supported db types */
    supportedDb = ["mongodb"];

    public constructor() { }

    /**
     * This method initialize the Database connector
     * @param dbType 
     * @param config 
     * @param conn 
     * @returns 
     */
    public init = (dbType: string | null = null, config: string = "default", conn: any = null) => new Promise(async (resolve, reject) => {
        {
            /* init parameters */
            this.dbType = dbType !== null ? dbType.toLowerCase() : this.baseDbType.toLowerCase();

            /* check if we support the connection type selected */
            if (this.supportedDb.indexOf(this.dbType) === -1)
                return ({ status: false, msg: "Database type not supported", content: null });

            if (conn === null) {
                // attempt to use connection defined in the settings
                if (!settings.default || !settings.default.conn)
                    return ({ status: false, msg: "You must provide connection string", content: null });

                /* if all is well and fine, create the connection */
                const validDbType = this.dbType && this.dbType.toLowerCase();
                /* create support for multiple database type in the future */
                if (validDbType == "mongodb") {
                    /* build our connection string using the details in settings */
                    const MongoClient = require('mongodb').MongoClient;

                    const dbUser = settings[config].user;
                    const password = settings[config].password;
                    const db = settings[config].db;
                    const conn = settings[config].conn;

                    /* build the full uri for our database calls */
                    const uri = conn.replace("<user>", dbUser)
                        .replace("<password>", password)
                        .replace("<dbname>", db);

                    const client = new MongoClient(uri, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        keepAlive: true,
                    });
                    // set the valid db name before we move on to next
                    this.db = db;
                    this.dbConfigIndex = config;
                    this.connUri = uri;
                    // connect client
                    await client.connect((err: any) => {
                        if (err) {
                            reject(err.message);
                        }
                        this.dbClient = client;
                        resolve(client);
                    });
                } else {
                    const msg = "not a valid connection call";
                    console.log(msg);
                    reject({ status: false, msg: msg, content: null });
                }
            }
            return this;
        }
    })

    close = () => {
        this.dbClient && this.dbClient.close();
        this.dbClient = null;
    }

    /**
     * Open a database table
     * @param client 
     * @param dbName 
     * @param baseTable 
     * @returns 
     */
    openTable = (client: any, dbName: string | null, baseTable: string) => new Promise(async (resolve, reject) => {
        {
            if (!dbName || !baseTable) return null;

            /* create a table for connection */
            const table = await client.db(dbName).collection(baseTable);
            if (!table)
                reject("error")
            resolve(table);
        }
    })

    /**
     * Select a database record
     * @param baseTable 
     * @param query 
     * @param project 
     * @param projections 
     * @param limit 
     * @returns 
     */
    selectRecord = async (baseTable: string, query: any, project = false, projections = {}, limit = 0) => new Promise(async (resolve, reject) => {
        this.openTable(this.dbClient, this.getDbName(), baseTable)
            .then(async (curCollection: any) => {
                if (project === true) {
                    await curCollection.find(query)
                        .project(projections)
                        .limit(limit)
                        .toArray((err: any, result: any) => {
                            if (err) {
                                reject(err.message);
                            }
                            resolve(result);
                        });
                } else {
                    await curCollection.find(query)
                        .limit(limit)
                        .toArray((err: any, result: any) => {
                            if (err) {
                                reject(err.message);
                            }
                            resolve(result);
                        });
                }
            })
            .catch(err => reject(err));
    })

    /**
     * Insert a new record into database
     * @param insertRecord 
     * @param baseTable 
     * @param insertMany 
     * @returns 
     */
    insertRecord = async (insertRecord: any, baseTable: string, insertMany = false) => new Promise(async (resolve, reject) => {
        await this.openTable(this.dbClient, this.getDbName(), baseTable)
            .then(async (curCollection: any) => {
                if (insertMany === false) {
                    curCollection.insertOne(insertRecord)
                        .then((result: any) => resolve(result.result))
                        .catch((err: any) => reject(err))
                }
            })
            .catch(err => reject(err));
    })

    /**
     * Update an existing database record
     * @param updateRecord 
     * @param baseTable 
     * @param whereClause 
     * @param increment 
     * @param insertMany 
     * @returns 
     */
    updateRecord = async (baseTable: string, updateRecord: any, where: any, autoAdd: boolean = false, increment: any = null, insertMany = false) => new Promise(async (resolve, reject) => {
        await this.openTable(this.dbClient, this.getDbName(), baseTable)
            .then(async (curCollection: any) => {
                if (insertMany === false) {
                    curCollection.updateOne(
                        where,
                        {
                            //$inc: increment,
                            $set: updateRecord
                        },
                        {
                            upsert: autoAdd
                        }
                    )
                        .then((result: any) => resolve(result.result))
                        .catch((err: any) => reject(err))
                }
            })
            .catch(err => reject(err));
    })

    /**
     * Delete an existing database record
     * @param baseTable 
     * @param query 
     * @param insertMany 
     * @returns 
     */
    deleteRecord = async (baseTable: string, query: string, deleteMany = false) => new Promise(async (resolve, reject) => {
        await this.openTable(this.dbClient, this.getDbName(), baseTable)
            .then(async (curCollection: any) => {
                if (deleteMany === false) {
                    curCollection.deleteOne(query)
                        .then((result: any) => resolve(result))
                        .catch((err: any) => reject(err))
                }
            })
            .catch(err => reject(err));
    })

    /**
     * Get the current database name
     * @returns {string} The name of the current database
     */
    getDbName = () => this.db;

    /**
     * Returns the value of the current connection `URI`
     * @returns {string}
     */
    getConnUri = () => this.connUri;
}