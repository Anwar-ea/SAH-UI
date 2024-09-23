import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthGuard } from '../../auth/AuthGuard';
const UserRoot = lazy(() => import('./Users-root'));
const UserList = lazy(() => import('./components/Users-list'));
const UserForm = lazy(() => import('./components/Users-form'));

export const userRoutes: RouteObject = {
    path: 'users',
    element: <>
        <AuthGuard >
            <Suspense> <UserRoot /></Suspense>
        </AuthGuard>
    </>,
    children: [
        {
            path: 'user-list',
            element: <Suspense> <UserList /></Suspense>,
        },
        {
            path: '',
            element: <Navigate to='/users/user-list' replace />,
        },
        {
            path: 'user-form',
            element: <Suspense> <UserForm /></Suspense>
        }
    ]
};