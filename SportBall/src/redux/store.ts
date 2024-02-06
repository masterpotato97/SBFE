import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slices/RootSlice";

const store = configureStore({
    reducer,
    devTools: true,
});

export default store;