import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modelNotifier } from "shared/lib/notifier";
import { appReducer } from "./app/reducer";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterSlice.reducer,
    notifications: modelNotifier.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
