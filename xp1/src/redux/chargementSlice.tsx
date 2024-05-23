import { createSlice } from "@reduxjs/toolkit"

export interface ChargementInterface {
    chargement: boolean
}

export let chargementSlice = createSlice({
    name: "chargementSlice",
    initialState: {
        chargement: false
    }, reducers: {
        AfficherSpiner: (state, action) => {
            state.chargement = action.payload
        }
    }
})

export let { AfficherSpiner } = chargementSlice.actions