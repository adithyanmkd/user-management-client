import { useSelector, useDispatch } from "react-redux";
import type { AppDispath, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispath>();
export const useAppSelector = useSelector.withTypes<RootState>();
