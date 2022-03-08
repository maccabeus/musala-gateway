

export interface ConnectionInterface {
    conn: string 
    db: string 
    user: string
    password: string
}

export type ConnectionSettings = {
    [propName: string]: ConnectionInterface
}