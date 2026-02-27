import type { JSX } from "react";
import s from './modal.module.css'

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
}

function Modal({ open, onClose, title, children }: ModalProps): JSX.Element | undefined {
  if (!open) return undefined;

  return (
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.modal_header}>
          <h3 className={s.header}>{title}</h3>
          <button className={s.modal__close} onClick={onClose}>❌</button>
        </div>
        <div className={s.modal__body}>
          {children}
        </div>
      </div>
  )
}

export default Modal