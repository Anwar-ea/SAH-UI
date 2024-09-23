import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material'
import './Header.scss'
export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
  let navigate = useNavigate();

  return (
<header  className='app-header'>
    <nav className='app-nav'>
    <span>Hello</span>
    <div style={{width: '15%' , display: 'flex', justifyContent: 'space-between'}}>
          <Button onClick={x => navigate('/home')} variant="outlined">Home</Button>
          <Button onClick={x => navigate('/about')} variant="outlined">About</Button>
          <Button onClick={x => navigate('/users')} variant="outlined">users</Button>
      </div>
    </nav>
</header>
  );
}
