import { combineReducers } from "@reduxjs/toolkit";
import { chargementSlice } from "./chargementSlice";
import protectedSlice from "./protectedSlice";

let rootReducer = combineReducers({
    chargementStore: chargementSlice.reducer,
    protectedStore: protectedSlice
})

//Nous avons besoin de définir GLOBALEMENT les Types ainsi que de les exporter
export type RootProps = ReturnType<typeof rootReducer>

export default rootReducer