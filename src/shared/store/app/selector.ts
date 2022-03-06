import { RootState } from "../";

export const selectAppState = (state: RootState) => state.app;
export const selectIsNewDesign = (state: RootState) => state.app.isNewDesign;
