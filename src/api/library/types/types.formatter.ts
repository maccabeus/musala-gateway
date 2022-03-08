/**
 * The server response interface. Our response formatter will 
 * implements this interface to enforce uniform response for all our `API` 
 */
export interface ResponseInterface {
        error: boolean;
        message: string | null
        errorCode: number | null
        statusCode: number | string
        data: string | null
}