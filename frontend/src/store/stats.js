import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        total: 0,
        completed: 0,
        incomplete: 0 
    },
    reducers: {
        setStats(state, action) {
            state.total = action.payload.total;
            state.completed = action.payload.completed;
            state.incomplete = action.payload.incomplete;
        },
        resetStats(state) {
            state.total = 0;
            state.completed = 0;
            state.incomplete = 0;
        }
        // You can add more reducers later as needed
    }
});

export const statsActions = statsSlice.actions;  // Exporting actions
export default statsSlice.reducer;