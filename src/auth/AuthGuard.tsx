import * as React from 'react';
import { useNavigate, Navigate , Outlet} from 'react-router-dom';
export interface IAuthGuardProps {
}

export function AuthGuard ({children}: any) {
  let allowComponent = true;

  if(!allowComponent){
    return <Navigate to='/home' />;
  }

  return  children;
}
