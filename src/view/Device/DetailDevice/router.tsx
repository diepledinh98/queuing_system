import { IRouter } from '@routers/interface';

export const routerViewDetailDevice: IRouter = {
    path: '/detaildevice',
    name: `common.adddevice`,
    loader: import('./index'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /device/i,
    //     'hideInNavbar': false
    // }
};