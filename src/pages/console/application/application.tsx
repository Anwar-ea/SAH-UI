import * as React from 'react';
import { Outlet } from 'react-router-dom';

interface IApplicationProps {
}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <>
    <Outlet/>
    </>
  );
};

export default Application;
