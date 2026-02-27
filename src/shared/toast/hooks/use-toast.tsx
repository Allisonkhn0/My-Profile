import { useContext } from 'react'
import { ToastContext } from '../toast-context/toast-context'

function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error("useToast требует провайдера ")
    return ctx
}

export default useToast