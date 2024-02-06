import { createSlice } from '@reduxjs/toolkit'

const updateSlice = createSlice({
    name: "update",
    initialState: {
        updateName: "Update Name",
        updateTeam: "Team Name",
        updateNumber: "Number",
        updatePosition: "Position"
    
    },
    reducers: {
        updateName: (state, action) => { state.updateName = action.payload},
        updateTeam: (state, action) => { state.updateTeam = action.payload},
        updateNumber: (state, action) => { state.updateNumber = action.payload},
        updatePosition: (state, action) => { state.updatePosition = action.payload},
    }
})

export const reducer = updateSlice.reducer;
export const { updateName, updateTeam, updateNumber, updatePosition} = updateSlice.actions