import { combineReducers } from '@reduxjs/toolkit';
import { type } from 'os';
import { useDispatch } from 'react-redux';
import profileStore from './authentication/profileStore';
import settingStore from './setting/settingStore';
import { deviceStore } from './device/deviceStore';
import { serviceStore } from './service/serviceStore';
import { provideNumberStore } from './providenumber/numberStore';
import { accountStore } from './account/accoutStore';
const appReducer = combineReducers({
  profile: profileStore.reducer,
  settingStore: settingStore.reducer,
  device: deviceStore.reducer,
  service: serviceStore.reducer,
  providenumber: provideNumberStore.reducer,
  account: accountStore.reducer
});

export type RootState = ReturnType<typeof appReducer>;

export default appReducer;
