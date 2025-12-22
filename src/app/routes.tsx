import { lazy } from 'react';
import { RouteConfig } from './routes/RouteTypes';

// Lazy loading des pages pour améliorer les performances
const HomePage = lazy(() =>
  import('../pages/public/HomePage').then((m) => ({ default: (m as any).HomePage })),
);
const MenuPage = lazy(() =>
  import('../pages/public/MenuPage').then((m) => ({ default: (m as any).MenuPage })),
);
const CustomerDashboardPage = lazy(() =>
  import('../pages/app/Customer/DashboardPage').then((m) => ({
    default: (m as any).CustomerDashboardPage,
  })),
);
const AdminDashboardPage = lazy(() =>
  import('../pages/app/Admin/DashboardPage').then((m) => ({
    default: (m as any).AdminDashboardPage,
  })),
);

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    meta: {
      title: 'Accueil',
      layout: 'public',
    },
  },
  {
    path: '/menu',
    component: MenuPage,
    meta: {
      title: 'Menu',
      layout: 'public',
    },
  },
  {
    path: '/dashboard',
    component: CustomerDashboardPage,
    meta: {
      title: 'Mon Compte',
      requiresAuth: true,
      roles: ['customer'],
      layout: 'app',
    },
  },
  {
    path: '/admin',
    component: AdminDashboardPage,
    meta: {
      title: 'Administration',
      requiresAuth: true,
      roles: ['admin'],
      layout: 'admin',
    },
  },
];
