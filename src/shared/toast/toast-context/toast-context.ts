import { createContext } from "react";
import type {
  ToastType,
  ToastTypeStatus,
} from "../toast-provider/toast-provider";

type ToastContextValue = {
  toasts: ToastType[];
  show: (message: string, type?: ToastTypeStatus) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);
