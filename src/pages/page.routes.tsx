import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { userRoutes } from './users/User-routes';
const Home = lazy(() => import('./home/Home'));
const Contact = lazy(() => import('./contact/Contact'));
const About = lazy(() => import('./about/About'));
const Auth = lazy(() => import('./auth/auth'));
import  App  from '../App';
import { dashboardRoutes } from './console/console.routes';
import Loader from '../components/loader/Loader';
const AuthValidate = lazy(() => import('./auth/auth-validate'));

const pageRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <App/>,
    children: [
      ...dashboardRoutes,
      userRoutes,
      {
        path: '/',
        element: <Suspense fallback={<Loader/>}><Home/></Suspense>
      },
      {
        path: 'home',
        element: <Suspense fallback={<Loader/>}><Home/></Suspense>
      },
      {
        path: 'contact',
        element: <Suspense fallback={<Loader/>}><Contact/></Suspense>
      },
      {
        path: 'about',
        element: <Suspense fallback={<Loader/>}><About/></Suspense>
      },
      {
        path: 'auth',
        element: <Suspense fallback={<Loader/>}><Auth/></Suspense>,
      },
      {
        path: 'auth/auth-validate',
        element: <Suspense fallback={<Loader/>}><AuthValidate/></Suspense>
      },
    ]
  }
] 

export const routes = createBrowserRouter(pageRoutes);