import type { JSX } from "react";
import './model.css'

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
}


function Modal({ open, onClose, title, children }: ModalProps): JSX.Element | undefined {


  if (!open) return undefined;


  return (<div className="modal-overlay">
    <div className="modal">

      <div className="header">
        {title}
      </div>

      <span className="modal__close" onClick={onClose}>❌</span>
      <div className="modal__body">
        {children}
      </div>
    </div>

  </div>
  )
}

export default Modal