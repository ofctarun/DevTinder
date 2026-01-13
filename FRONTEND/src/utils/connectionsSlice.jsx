import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: {
    connections: [],
  },
  reducers: {
    addConnections: (state, action) => {
      state.connections = action.payload;
    },
    removeConnections: (state, action) => {
      state.connections = [];
    },
  },
});

export default connectionsSlice.reducer;
export const { addConnections, removeConnections } = connectionsSlice.actions;