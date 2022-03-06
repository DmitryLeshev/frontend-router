import { createSlice } from "@reduxjs/toolkit";

import { cubicApi } from "shared/api";
import type { Response } from "shared/api";

export const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => state,
    updateUserDetails: (state) => state,
  },
});
