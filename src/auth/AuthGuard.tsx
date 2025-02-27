import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { decrypt } from '../utility/crypto';
import { IUser } from '../models/interfaces/Response/user';

export interface IAuthGuardProps {
}

export function AuthGuard ({children}: any) {
  let data: IUser | null = null;
  let userDataFromLS = localStorage.getItem('common');
  if(userDataFromLS) data = decrypt<IUser>(userDataFromLS);

  if(!data){
    return <Navigate to='/auth' />;
  }

  return  children;
}
