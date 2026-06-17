import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

//usedispatch +types == custom hook

const useAppSelector = useSelector.withTypes<RootState>();
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export { useAppSelector, useAppDispatch };
