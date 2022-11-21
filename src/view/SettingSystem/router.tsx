import { IRouter } from '@routers/interface';

export const routerViewSetting: IRouter = {
    path: '/setting',
    name: 'common.setting.system',
    loader: import('./index'),
    exact: true,
    menu: {
        'exact': true,
        activePath: /setting/i,
        'hideInNavbar': false
    },
    routes: [
        {
            path: '/setting/manage/role',
            name: 'common.manage.role',
            loader: import('./manage/RoleManage'),
            exact: true,
            menu: {
                'exact': true,
                activePath: /manage\/role/i,
                'hideInNavbar': false
            }
        },
        {
            path: '/setting/manage/account',
            name: 'common.manage.account',
            loader: import('./manage/Account/AccountManage'),
            exact: true,
            menu: {
                'exact': true,
                activePath: /manage\/account/i,
                'hideInNavbar': false
            }
        },

        {
            path: '/setting/log/user',
            name: 'common.log.user',
            loader: import('./log/UserLog'),
            exact: true,
            menu: {
                'exact': true,
                activePath: /log\/user/i,
                'hideInNavbar': false
            }
        }
    ]
};