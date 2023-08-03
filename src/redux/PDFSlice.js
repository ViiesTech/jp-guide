import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allPdf: [],
    Dark : false
}

export const counterSlice = createSlice({
    name: 'pdf',
    initialState,
    reducers: {
        setAllPdf: (state, action) => {

            state.allPdf = action.payload
        },
        setDark : (state, action) => {
            state.Dark = true
        },
        setLight: (state) => {
            state.Dark = false
        }
        
    },
})

// Action creators are generated for each case reducer function
export const { setAllPdf, setDark, setLight } = counterSlice.actions

export default counterSlice.reducer