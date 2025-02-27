import { IPrivilege } from "./privilege";
import { IResponseBase } from "./response-base";

export interface IRole extends IResponseBase {
    name: string;
    code: string;
    accountId?: string;
    privileges?: Array<IPrivilege>;
}