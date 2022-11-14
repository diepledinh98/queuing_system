import { combineReducers } from '@reduxjs/toolkit';
import { type } from 'os';
import { useDispatch } from 'react-redux';
import profileStore from './authentication/profileStore';
import settingStore from './setting/settingStore';
import { deviceStore } from './device/deviceStore';
import { serviceStore } from './service/serviceStore';
const appReducer = combineReducers({
  profile: profileStore.reducer,
  settingStore: settingStore.reducer,
  device: deviceStore.reducer,
  service: serviceStore.reducer
});

export type RootState = ReturnType<typeof appReducer>;

export default appReducer;
