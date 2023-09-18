import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import GenLayout from './components/GenLayout/GenLayout';

const NotFound = Loadable(lazy(() => import('app/views/NotFound')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

const Projects = Loadable(lazy(() => import('app/views/dashboard/Projects')));

const routes = [
  {
    element: (
      <AuthGuard>
        <GenLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },
      {
        path: '/dashboard/projects',
        element: <Projects />,
        auth: authRoles.admin
      }
    ]
  },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
