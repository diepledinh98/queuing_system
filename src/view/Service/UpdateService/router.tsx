import { IRouter } from '@routers/interface';

export const routerViewUpdateService: IRouter = {
    path: '/updateservice',
    name: 'common.updateservice',
    loader: import('./index'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /service/i,
    //     'hideInNavbar': false
    // }
};