import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

type accountStore = {
    id?: string
    name: string
    image: string
    eamil: string
    phone: string
    role: string
    status: boolean
    username: string
    password: string
};
// const device = {
//     deviceId: "",
//     deviceName: "",
//     deviceIp: "",
//     deviceType: "",
//     deviceNameToLogin: "",
//     devicePassword: "",
//     deviceService: "",
// };
interface IStore {
    statusAdd?: boolean;
    account?: accountStore[] | object[];
}
// export const fetchDevices = createAction<{
//   devices: Array<object | undefined>;
// }>("devices/get");
export const addAccountInStore = createAction<{ account: object }>("account/add");
export const accountStore = createSlice({
    name: "accountStore",
    initialState: {
        statusAdd: false,
        account: [],
    } as unknown as IStore,
    reducers: {
        addAccountInStore: (
            state,
            action: PayloadAction<{
                account: object;
            }>
        ) => Object.assign(state, { account: action.payload }),

        fetchAccount: (
            state,
            action: PayloadAction<{
                account: object[] | any;
            }>
        ) => Object.assign(state, { account: action.payload.account }),

        // fetchDevices: (
        //   state,
        //   action: PayloadAction<{ devices: Array<object | undefined> }>
        // ) => {
        //   console.log(action.payload.devices, "instore devie nônnoo");
        //   return Object.assign(state, { devices: action.payload.devices });
        // },
    },
});