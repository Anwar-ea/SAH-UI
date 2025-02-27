import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { AuthGuard } from "../../auth/AuthGuard";
import Loader from "../../components/loader/Loader";
const Dashboard = lazy(() => import('./dashboard/dashboard'))
const Console = lazy(() => import('./console'))
const Application = lazy(() => import('./application/application'))
const ApplicationForm = lazy(() => import('./application/app-form'))
const ApplicationList = lazy(() => import('./application/app-list'))
const ApiKey = lazy(() => import('./api-key/api-key'))
const Developers = lazy(() => import('./developers/developers'))
export const dashboardRoutes: Array<RouteObject> = [
    {
      path: 'console',
      element: <AuthGuard><Suspense fallback={<Loader/>}><Console/></Suspense></AuthGuard>,
      children: [
        {
          path: 'dashboard',
          element: <Suspense fallback={<Loader/>}><Dashboard/></Suspense>,
        },
        {
          path: '',
          element: <Suspense fallback={<Loader/>}><Application/></Suspense>
        },
        {
          path: 'api-key',
          element: <Suspense fallback={<Loader/>}><ApiKey/></Suspense>
        },
        {
          path: 'developers',
          element: <Suspense fallback={<Loader/>}><Developers/></Suspense>
        },
        {
          path: 'app',
          element: <Suspense fallback={<Loader/>}><Application/></Suspense>,
          children: [
            {
              path: 'list',
              element: <Suspense fallback={<Loader/>}><ApplicationList/></Suspense>
            },
            {
              path: '',
              element: <Suspense fallback={<Loader/>}><ApplicationList/></Suspense>
            },
            {
              path: 'add',
              element: <Suspense fallback={<Loader/>}><ApplicationForm/></Suspense>
            },
            {
              path: 'edit/:id',
              element: <Suspense fallback={<Loader/>}><ApplicationForm/></Suspense>
            }
          ]
        }

      ]
    }
  ] 