import { IRouter } from '@routers/interface';
import { DashboardIcon } from '@shared/components/iconsComponent';
import { ReactSVG } from 'react-svg';
import { device } from '@assets/svg';
export const routerViewDevice: IRouter = {
    path: '/device',
    name: 'common.device',
    loader: import('./index'),
    exact: true,
    menu: {

        'exact': true,
        activePath: /device/i,
        'hideInNavbar': false
    }
};