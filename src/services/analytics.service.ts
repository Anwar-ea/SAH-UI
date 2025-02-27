import { AnalyticsDashboard } from "../models/interfaces/Response/analytics-response";
import { BaseRequestService } from "./api.service";
type OptionsResponse = Array<{id: string, name: string}>
export class AnalyticsService extends BaseRequestService  {
    constructor(){
        super();
        this.withCredentials = true;
    }
    
    controller: string = 'analytics';

    getAccounts = async (appId: string): Promise<OptionsResponse> => {
        return (await this.get<OptionsResponse>(`${this.controller}/get_accounts/${appId}`, undefined, {withCredentials: true})).data
    }

    getProperties = async (appId: string, accountId: string): Promise<OptionsResponse> => {
        return (await this.get<OptionsResponse>(`${this.controller}/get_properties/${accountId}/${appId}`, undefined, {withCredentials: true})).data
    }

    getAnalytics = async (appId: string): Promise<AnalyticsDashboard> => {
        return (await this.get<AnalyticsDashboard>(`${this.controller}/get_analytics/${appId}`, undefined, {withCredentials: true})).data
    }

}

export const analyticsService: AnalyticsService = new AnalyticsService();
