import { UserStatus } from "../../enums/user-status";
import { IAccount } from "./account";
import { IResponseBase } from "./response-base";
import { IRole } from "./role";

export interface IUser extends IResponseBase {
    userName: string;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: Date;
    status: UserStatus;
    lastLogin?: Date;
    lastOnline?: Date;
    roleId: string;
    role?: IRole;
    pictureUrl?: string;
    accountId?: string;
    account?: IAccount;
}