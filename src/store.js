import { configureStore } from "@reduxjs/toolkit";
import chessSlice from "./chessSlice";

export default configureStore({
    reducer : {
        chess : chessSlice
    }
})