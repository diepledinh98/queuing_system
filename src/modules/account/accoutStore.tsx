import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, addDoc, getDocs, updateDoc, setDoc, where } from "firebase/firestore";
import { FirebaseConfig } from "src/firebase/configs";
import { useState, useEffect } from "react";
import { device } from "@assets/svg";
import { stat } from "fs";
const db = FirebaseConfig.getInstance().fbDB
type accountStore = {
    id?: string
    name: string
    image: string
    email: string
    phone: string
    role: string
    status: string
    username: string
    password: string
};

interface Accounts {
    accounts: accountStore[]
}

const initialState: Accounts = {
    accounts: []
}

export const fetchAccounts = createAsyncThunk("accountStore/fetchAccounts", async (thunkAPI) => {
    let accounts: Array<undefined | object> = [];
    const q = collection(db, "users");

    const querySnapshot = await getDocs(q);

    let id: string
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        id = doc.id
        accounts.push({ id, ...doc.data() });
    });

    return accounts as Array<accountStore>;
})

export const createAccount = createAsyncThunk("accountStore/createAccount", async (body: Omit<accountStore, 'id'>, thunkAPI) => {
    addDoc(collection(db, 'users'), {
        ...body
    })
    return {
        ...body,
    } as accountStore;


})
export const updateAccount = createAsyncThunk("accountStore/updateAccount", async ({ idAccount, body }: { idAccount: string, body: accountStore }, thunkAPI) => {
    const accountNeedUpdate = doc(db, "devices", idAccount);
    updateDoc(accountNeedUpdate, { ...body })
    return {
        ...body,
    } as accountStore;
})
export const accountStore = createSlice({
    name: "accountStore",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.accounts = action.payload
            })

            .addCase(createAccount.fulfilled, (state, action) => {
                state.accounts.push(action.payload)
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.accounts.find((account, index) => {
                    if (account.id === action.payload.id) {
                        state.accounts[index] = action.payload
                        return true
                    }
                    return false
                })
            })

    },
});