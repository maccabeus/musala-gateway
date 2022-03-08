import * as crypto from "crypto";

export const convertToMd5=(value: string, encoding: crypto.BinaryToTextEncoding='hex')=>{
    return crypto.createHash('md5').update(value).digest(encoding).toString();
}

export const createUUID=()=>{
    return crypto.randomUUID().toString();
}