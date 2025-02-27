import { IFetchRequest } from "../models/interfaces/request/fetch-request";
import { IApiKey, IApiKeyRequest } from "../models/interfaces/Response/api-key";
import { IDataSourceResponse } from "../models/interfaces/Response/dataSource";
import { BaseRequestService } from "./api.service";

export class ApiKeyService extends BaseRequestService  {
    constructor(){
        super();
        this.withCredentials = true;
    }
    controller: string = 'api-key';

    createRecord = async (payload: IApiKeyRequest): Promise<IApiKey> => {
        return (await this.post<IApiKeyRequest, IApiKey>(`${this.controller}/add`, payload)).data
    }

    getRecords = async (fetchRequest: IFetchRequest<IApiKey> = {}): Promise<IDataSourceResponse<IApiKey>> => {
        return (await this.post<IFetchRequest<IApiKey>, IDataSourceResponse<IApiKey>>(`${this.controller}/get_all`, fetchRequest)).data
    }

    getById = async (id: string): Promise<IApiKey|null> => {
        return (await this.get<IApiKey|null>(`${this.controller}/get_by_id/${id}`)).data
    }

    updateRecord = async (id: string, payload: IApiKeyRequest): Promise<IApiKey> => {
        return (await this.put<IApiKeyRequest, IApiKey>(`${this.controller}/update/${id}`, payload)).data
    }

    deleteRecord = async (id: string): Promise<IApiKey|null> => {
        return (await this.delete<IApiKey>(`${this.controller}/delete/${id}`)).data
    }
}

export const apiKeyService: ApiKeyService = new ApiKeyService()//serviceGenerator<IServiceObj<IApiKeyRequest, IApiKey>,ApiKeyService>(new ApiKeyService) as IServiceObj<IApiKeyRequest, IApiKey>;