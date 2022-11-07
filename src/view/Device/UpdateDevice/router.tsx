import { IRouter } from '@routers/interface';

export const routerViewUpdateDevice: IRouter = {
    path: '/updatedevice',
    name: `common.updatedevice`,
    loader: import('./index'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /device/i,
    //     'hideInNavbar': false
    // }
};