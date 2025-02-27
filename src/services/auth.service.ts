import { ILoginRequest, ILoginWithGoogle } from "../models/interfaces/request/login";
import { IUser } from "../models/interfaces/Response/user";
import { ISignUpRequest } from "../pages/auth/Signup";
import { BaseRequestService } from "./api.service";

export class AuthService extends BaseRequestService  {
    constructor(){
        super();
    }

    controller: string = 'auth';

    generateGoogleAuthUrl = async (payload: ILoginWithGoogle): Promise<{url: string}> => {
        return (await this.post<ILoginWithGoogle, {url: string}>(`${this.controller}/login_with_google`, payload)).data
    }

    login = async (payload: ILoginRequest): Promise<IUser> => {
        return (await this.post<ILoginRequest, IUser>(`${this.controller}/login`, payload)).data
    }

    signUp = async (payload: ISignUpRequest): Promise<IUser> => {
        return (await this.put<ISignUpRequest, IUser>(`${this.controller}/signup`, payload)).data
    }

    currentProfile = async (): Promise<IUser> => {
        return (await this.get<IUser>(`${this.controller}/profile`,undefined, {withCredentials: true})).data
    }

    logout = async (): Promise<{success: boolean, message: string}> => {
        return (await this.get<{success: boolean, message: string}>(`${this.controller}/logout`)).data;
    }
}

export const authService: AuthService = new AuthService();
