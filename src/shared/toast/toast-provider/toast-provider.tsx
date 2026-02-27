import { useState, type JSX } from "react"
import { ToastContext } from "../toast-context/toast-context";

export type ToastTypeStatus = "success" | "error" | "info";

export type ToastType = {
  id: number;
  message: string;
  type: ToastTypeStatus
}

const TOAST_DURATION_MS = 3000

export function ToastProvider({ children }: { children: JSX.Element }) {



  const [toasts, setToasts] = useState<ToastType[] | []>([])


  const show = (message: string, type: ToastTypeStatus = "info") => {
    const id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1
    setToasts(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts(prev => prev.filter(el => el.id !== id))
    }, TOAST_DURATION_MS)
  }


  return (
    <ToastContext value={{ toasts, show }}>{children} </ToastContext>
  )
}

export default ToastProvider