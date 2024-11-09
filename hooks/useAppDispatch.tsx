import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
