import * as React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface IUserListProps {
}

export default function UserList (props: IUserListProps) {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <span>user list</span>
      <Button onClick={e=> navigate('/users/user-form')} variant='contained'>Add User</Button>
      </div>
    </div>
  );
}
