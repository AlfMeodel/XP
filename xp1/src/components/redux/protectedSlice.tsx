import { createSlice } from "@reduxjs/toolkit"

interface ProtectedInterface {
    protected: boolean
}

let initialState: ProtectedInterface = {
    protected: localStorage.getItem("user") !== null
}

let protectedSlice = createSlice({
    name: "protectedStore",
    initialState, reducers: {
        Login: (state) => {
            state.protected = true
        },
        Logout: (state) => {
            state.protected = false
        }

    }
})

export let { Login, Logout } = protectedSlice.actions

export default protectedSlice.reducer