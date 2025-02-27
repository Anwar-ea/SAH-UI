import { IModule } from "./module";
import { IResponseBase } from "./response-base";
import { IRole } from "./role";

export interface IPrivilege extends IResponseBase {
    name: string;
    code: string;
    moduleId: string;
    module?: IModule;
    roles?: Array<IRole>;
}