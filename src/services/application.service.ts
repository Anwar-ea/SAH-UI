import { IFetchRequest } from "../models/interfaces/request/fetch-request";
import { IApplication, IApplicationRequest } from "../models/interfaces/Response/applicatipon";
import { IDataSourceResponse } from "../models/interfaces/Response/dataSource";
import { BaseRequestService } from "./api.service";

export class ApplicationService extends BaseRequestService  {
    constructor(){
        super();
    }
    controller: string = 'application';

    createRecord = async (payload: IApplicationRequest): Promise<IApplication> => {
        return (await this.post<IApplicationRequest, IApplication>(`${this.controller}/add`, payload)).data
    }

    getRecords = async (fetchRequest: IFetchRequest<IApplication> = {}): Promise<IDataSourceResponse<IApplication>> => {
        return (await this.post<IFetchRequest<IApplication>, IDataSourceResponse<IApplication>>(`${this.controller}/get_all`, fetchRequest)).data
    }

    getById = async (id: string): Promise<IApplication|null> => {
        return (await this.get<IApplication|null>(`${this.controller}/get_by_id/${id}`)).data
    }

    updateRecord = async (id: string, payload: IApplicationRequest): Promise<IApplication> => {
        return (await this.put<IApplicationRequest, IApplication>(`${this.controller}/update/${id}`, payload)).data
    }

    deleteRecord = async (id: string): Promise<IApplication|null> => {
        return (await this.delete<IApplication>(`${this.controller}/delete/${id}`)).data
    }
}

export const applicationService: ApplicationService = new ApplicationService()//serviceGenerator<IServiceObj<IApplicationRequest, IApplication>,ApplicationService>(new ApplicationService) as IServiceObj<IApplicationRequest, IApplication>;