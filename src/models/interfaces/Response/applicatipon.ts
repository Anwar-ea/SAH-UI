import { IAccountResponseBase } from "./response-base";

export interface IApplicationRequest {
    name: string;
    url?: string;
    refreshToken?: string;
    accessToken?: string;
    analyticsAccountId?: string;
    accountName?: string;
    propertyId?: string;
    imageUrl?: string
    propertyName?: string;
    tokenExpiryDate?: Date;
}

export interface IApplication extends IApplicationRequest, IAccountResponseBase {
}
