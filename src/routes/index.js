import AppPomo from '~/pages/AppPomo';
import Home from '~/pages/Home';
import { HeaderOnly } from '~/layouts';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/app',
        component: AppPomo,
        layout: HeaderOnly,
    },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
