import { IPrivilege } from "./privilege";
import { IResponseBase } from "./response-base";

export interface IModule extends IResponseBase {
    name: string;
    code: string;
    privileges?: Array<IPrivilege>;
}