import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: "Name",
        team: "Team Name",
        number: "Number",
        position: "Position"
    
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseTeam: (state, action) => { state.team = action.payload},
        chooseNumber: (state, action) => { state.number = action.payload},
        choosePosition: (state, action) => { state.position = action.payload},
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseTeam, chooseNumber, choosePosition} = rootSlice.actions