import { ConnectionSettings } from "./../library/db-manager/mido.types";
import dotEnv from "dotenv";

dotEnv.config();

const connectionSettings: ConnectionSettings = {
    default: {
        // conn: encodeURI("mongodb://localhost:27017/musala"),
        conn: encodeURI(process.env.DB_HOST ?? "") ?? "",
        db: process.env.DB_NAME ?? "",
        user: process.env.DB_USER ?? "",
        password: process.env.DB_PASSWORD ?? "",
    }
}

export const deviceTable: string ="devices";
export const gatewayTable: string ="gateways";

export default connectionSettings;