import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

type serviceProps = {
    id?: string
    serviceID: string;
    serviceName: string;
    serviceStatus: boolean
    SyntaxProvide: {
        Growauto?: number[]
        Prefix?: string
        Surfix?: string
        Reset?: boolean
    }
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
    services?: serviceProps[] | object[];
}
// export const fetchDevices = createAction<{
//   devices: Array<object | undefined>;
// }>("devices/get");
export const addServiceInStore = createAction<{ service: object }>("services/add");
export const serviceStore = createSlice({
    name: "serviceStore",
    initialState: {
        statusAdd: false,
        services: [],
    } as unknown as IStore,
    reducers: {
        addServiceInStore: (
            state,
            action: PayloadAction<{
                service: object;
            }>
        ) => Object.assign(state, { service: action.payload }),

        fetchService: (
            state,
            action: PayloadAction<{
                services: object[] | any;
            }>
        ) => Object.assign(state, { services: action.payload.services }),

        // fetchDevices: (
        //   state,
        //   action: PayloadAction<{ devices: Array<object | undefined> }>
        // ) => {
        //   console.log(action.payload.devices, "instore devie nônnoo");
        //   return Object.assign(state, { devices: action.payload.devices });
        // },
    },
});