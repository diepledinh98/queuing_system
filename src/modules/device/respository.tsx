import { async } from "@firebase/util";
import { query } from "express";
import { collection, doc, getDocs, setDoc, where } from "firebase/firestore";
import { FirebaseConfig } from "../../firebase/configs/index"
const db = FirebaseConfig.getInstance().fbDB;
export const getDevices = async () => {
    let devices: Array<undefined | object> = [];
    const q = collection(db, "device");

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        devices.push(doc.data());
    });
    return devices;
};

export const addDevice = async ({
    device,
    id,
}: {
    device: object;
    id: string;
}) => {
    return setDoc(doc(db, "device", id), { ...device, id });
};

export const updateDevice = async ({
    device,
    id,
}: {
    device: object;
    id: string;
}) => {
    return setDoc(doc(db, "device", id), { ...device, id });
};