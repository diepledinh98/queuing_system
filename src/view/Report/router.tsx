import { IRouter } from '@routers/interface';

export const routerViewReport: IRouter = {
    path: '/report',
    name: 'common.report',
    loader: import('./index'),
    exact: true,
    menu: {
        'exact': true,
        activePath: /report/i,
        'hideInNavbar': false
    }
};