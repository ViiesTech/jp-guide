import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allPdf: []
}

export const counterSlice = createSlice({
    name: 'pdf',
    initialState,
    reducers: {
        setAllPdf: (state, action) => {

            state.allPdf = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAllPdf } = counterSlice.actions

export default counterSlice.reducer