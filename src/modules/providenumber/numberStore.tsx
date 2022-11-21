import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
type serviceProps = {
    id?: string
    serviceID: string;
    serviceName: string;
    serviceStatus: boolean
    Growauto?: number[]
    Prefix?: string
    Surfix?: string
    Reset?: boolean
};
type provideNumberProps = {
    id?: string
    dateduse: string
    linkServiceId: string
    stt: number
    timeprovide: string
    status: string
    service: serviceProps
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
    providenumber?: provideNumberProps[] | object[];
}
// export const fetchDevices = createAction<{
//   devices: Array<object | undefined>;
// }>("devices/get");
export const addnumberInStore = createAction<{ providenumber: object }>("providenumber/add");
export const provideNumberStore = createSlice({
    name: "provideNumberStore",
    initialState: {
        statusAdd: false,
        providenumber: [],
    } as unknown as IStore,
    reducers: {
        addProvideNumberInStore: (
            state,
            action: PayloadAction<{
                providenumber: object;
            }>
        ) => Object.assign(state, { providenumber: action.payload }),

        fetchprovidenumber: (
            state,
            action: PayloadAction<{
                providenumber: object[] | any;
            }>
        ) => Object.assign(state, { providenumber: action.payload.providenumber }),

        // fetchDevices: (
        //   state,
        //   action: PayloadAction<{ devices: Array<object | undefined> }>
        // ) => {
        //   console.log(action.payload.devices, "instore devie nônnoo");
        //   return Object.assign(state, { devices: action.payload.devices });
        // },
    },
});