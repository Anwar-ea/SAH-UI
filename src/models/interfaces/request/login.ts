export interface ILoginRequest {
  userName: string;
  password: string;
}

export interface ILoginWithGoogle {
  userId?: string;
  applicationId?: string;
  action?: GoogleUrlAction;
}

export type GoogleUrlAction = "login"|"signup"|"add-app";