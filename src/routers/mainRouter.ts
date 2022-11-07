import { routerForgotPassword } from '@view/Auth/ForgotPassword/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerViewProfile } from '@view/Auth/Profile/router';
import { routerViewDevice } from '@view/Device/router';
import { routerHomepage } from '@view/Homepage/router';
import { routerViewProvideNumber } from '@view/ProvideNumber/router';
import { routerViewReport } from '@view/Report/router';
import { routerViewRoot } from '@view/router';
import { routerViewService } from '@view/Service/router';
import { routerViewSetting } from '@view/SettingSystem/router';

import { IRouter } from './interface';
import { routerViewAddDevice } from '@view/Device/AddDevice/router';
import { routerViewDetailDevice } from '@view/Device/DetailDevice/router';
import { routerViewUpdateDevice } from '@view/Device/UpdateDevice/router';
export const privatePage: IRouter[] = [routerViewRoot, routerHomepage, routerViewProfile, routerViewAddDevice, routerViewDevice, routerViewDetailDevice,
    routerViewReport, routerViewProvideNumber, routerViewService, routerViewSetting, routerViewUpdateDevice
];

export const publicPage: IRouter[] = [routerLogin, routerForgotPassword];
