import fs from "fs";
import path from "path";

/**
 * Load the specified language. The default is `en-us`
 * @param lang string
 */
export const loadLanguage = (key: string | null = null, lang: string = "en-us", fileExt: string = "js") => {

    const langFilePath = `./${lang}.${fileExt}`;
    try {
        const langData = require(langFilePath);

        if (!langData) {
            return { status: false, data: null, msg: "language empty" }
        }
        /** parse language data before returning  */
        //const data=JSON.parse(langData.toString());
        const data = (langData);

        /** parse for key entries if provided. Each key entry corresponds to each application route */
        return { status: true, data: key === null ? data : data[key] ? data[key] : null, msg: "language data loaded" }

    } catch (e: any) {
        if (e) {
            return { status: false, data: null, msg: e.message };
        }
    }
}

/**
 * Retrieve specific index within the languageData 
 * @param langData 
 * @param key 
 */
export const say = (langData: any, key: string) => {
    if (!langData || !key) {
        //throw new Error("Language file or index not provided")
        return "Language file or index not provided";
    }

    return !langData[key] ? "language index not found" : langData[key];
}