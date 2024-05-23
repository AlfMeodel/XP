import { configureStore } from "@reduxjs/toolkit";
import { chargementSlice } from "./chargementSlice";

export let store = configureStore({
    reducer: {
        chargementStore: chargementSlice.reducer
    }
})

