import { combineReducers } from '@reduxjs/toolkit';

import profileStore from './authentication/profileStore';
import settingStore from './setting/settingStore';
import { deviceStore } from './device/deviceStore';
const appReducer = combineReducers({
  profile: profileStore.reducer,
  settingStore: settingStore.reducer,
  device: deviceStore.reducer,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
