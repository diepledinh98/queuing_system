import { IRouter } from '@routers/interface';

export const routerViewService: IRouter = {
    path: '/service',
    name: 'common.service',
    loader: import('./index'),
    exact: true,
    menu: {
        'exact': true,
        activePath: /service/i,
        'hideInNavbar': false
    }
};