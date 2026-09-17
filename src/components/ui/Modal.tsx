import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  closeLabel?: string;
}

/**
 * Modal ที่ใช้ <dialog> ของ browser — ได้ focus trap, ปุ่ม Esc และ inert background มาในตัว
 */
export function Modal({ open, onClose, labelledBy, children, className, panelClassName, closeLabel = 'ปิดหน้าต่าง' }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Sync การปิดแบบ native (กด Esc / dialog.close()) กลับไปที่ state ของ React
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => onCloseRef.current();
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onCloseRef.current();
    };
    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      className={cn('modal', className)}
      onClick={(event) => {
        // คลิกพื้นหลัง (backdrop) เพื่อปิด
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={cn('modal-panel relative rounded-[1.75rem] bg-white shadow-lift', panelClassName)}>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full bg-white/90 text-brand-900 ring-1 ring-brand-100 backdrop-blur transition duration-200 hover:bg-brand-50 hover:ring-brand-300 sm:right-4 sm:top-4"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        {open && children}
      </div>
    </dialog>
  );
}
