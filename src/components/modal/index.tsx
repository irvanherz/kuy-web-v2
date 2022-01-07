import { Dialog } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { CSSProperties, forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  actions: ReactNode[] | ReactNode | string,
  maxWidth?: number,
  defaultVisible?: boolean,
  visible?: boolean,
  onVisibleChange?: (visible: boolean) => void,
  title?: ReactNode,
  description?: ReactNode,
  children?: ReactNode,
  className?: string,
  style?: CSSProperties,
  bodyClassName?: string,
  bodyStyle?: CSSProperties,
  destroyOnClose?: boolean,
}

interface ModalFunc {
  setVisibility: (visible: boolean) => void
}


const Modal = forwardRef<ModalFunc, ModalProps>(({ destroyOnClose = false, actions, defaultVisible, visible, maxWidth = 700, onVisibleChange, title, description, children, className, style, bodyClassName, bodyStyle }: ModalProps, ref) => {
  const [internalVisible, setInternalVisible] = useState<boolean>()
  const [portal] = useState(() => {
    const div = document.createElement('div')
    return div
  });

  const computedVisible = useMemo(() => {
    let res = visible === undefined ? internalVisible : visible
    res = res === undefined ? defaultVisible : res
    return res ? true : false
  }, [visible, internalVisible, defaultVisible])

  useImperativeHandle(ref, () => ({
    setVisibility: triggerVisibleChange,
  }));

  useEffect(() => {
    if (computedVisible)
      document.body.classList.add('has-active-modal')
    else
      !document.querySelectorAll('.modal-visible').length && document.body.classList.remove('has-active-modal');
    return () => {
      !document.querySelectorAll('.modal-visible').length && document.body.classList.remove('has-active-modal');
    }
  }, [computedVisible])

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')

    if (computedVisible && portal.parentElement !== modalRoot) {
      modalRoot?.appendChild(portal)
    } else {
      destroyOnClose && portal.parentElement && modalRoot?.removeChild(portal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedVisible, destroyOnClose])

  const triggerVisibleChange = (newVisible: boolean) => {
    if (visible === undefined) {
      setInternalVisible(newVisible)
    }
    onVisibleChange && onVisibleChange(newVisible)
  }

  const handleClose = () => triggerVisibleChange(false)

  return createPortal(
    <div className={`fixed z-80 inset-0 overflow-y-auto ${computedVisible ? 'block modal-visible' : 'hidden modal-hidden'}`}>
      <div
        className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-black bg-opacity-30"
      />
      <div className='fixed inset-0 overflow-y-auto flex'>
        <div className='relative p-3 m-auto w-full' style={{ maxWidth }}>
          <div className={classNames('rounded border bg-white', className)} style={style}>
            <div className={`m-4 font-semibold text-xl`}>{title}</div>
            <div className=''>
              {description
                ? <div className='m-4'>{description}</div>
                : null
              }
              {children
                ? <div className={classNames('m-4', bodyClassName)} style={bodyStyle}>{children}</div>
                : null
              }
            </div>
            {actions
              ? <div className={classNames(actions ? 'text-right space-x-2 p-2' : '')}>{actions}</div>
              : null
            }
          </div>
          <button className='absolute w-4 h-4 top-2 right-2 bg-white rounded-full' onClick={handleClose}><XCircleIcon className='w-4 h-4 text-red-400' /></button>
        </div>
      </div>
    </div>
    , portal
  )
})

export default Modal