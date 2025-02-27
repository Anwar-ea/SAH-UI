import { IAccountResponseBase } from "./response-base";

export interface IApiKey extends  IAccountResponseBase {
    apiKey: string;
    usage: number;
}

export interface IApiKeyRequest {
    
}