import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../libs/redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
