import * as React from 'react';
import {Outlet} from 'react-router-dom'
export interface IUserRootProps {
}

export default function UserRoot (props: IUserRootProps) {
  return (
    <div className='w-full pt-5'>
      <div className='flex justify-between bg-slate-500 mb-5 p-3'>
        <h3>
          Users
        </h3>
        <span></span>
      </div>
      <Outlet/>
    </div>
  );
}
