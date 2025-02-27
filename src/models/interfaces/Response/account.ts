import { IResponseBase } from "./response-base";

export interface IAccount extends IResponseBase {
    name: string;
    phoneNo: string;
    email: string;
    address?: string;
    temporaryAddress?: string;
    zipCode?: number;
    country?: string;
    state?: string;
    city?: string;
}