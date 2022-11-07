import { IRouter } from '@routers/interface';

export const routerViewProvideNumber: IRouter = {
    path: '/provide',
    name: 'common.provide.number',
    loader: import('./index'),
    exact: true,
    menu: {
        'exact': true,
        activePath: /provide/i,
        'hideInNavbar': false
    }
};