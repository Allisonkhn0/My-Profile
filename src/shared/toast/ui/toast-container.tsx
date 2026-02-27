import useToast from "../hooks/use-toast"
import './toast-container.css'


function ToastContainer() {

    const { toasts } = useToast();

    return (
        <div className="toast-container">
            {
                toasts.map(toast => (
                    <div key={toast.id} className={`toast toast-${toast.type}`} role="alert">
                        {toast.message}
                    </div>
                ))
            }
        </div>
    )
}

export default ToastContainer