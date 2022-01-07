import { ComponentProps, CSSProperties, useEffect } from "react"
import LoadingOverlay from "./loading";
import ErrorOverlay from "./error";

export interface OverlayProps extends ComponentProps<'div'> {
  visible?: boolean,
  position?: 'absolute' | 'fixed',
  bodyStyle?: CSSProperties,
  bodyClassName?: string,
}

function Overlay({ children, visible = true, position = 'absolute', style, className, bodyStyle, bodyClassName }: OverlayProps) {
  useEffect(() => {
    if (visible)
      document.body.classList.add('has-active-overlay')
    else
      document.body.classList.remove('has-active-overlay');
    return () => document.body.classList.remove('has-active-overlay');
  }, [visible])
  return (
    <div
      className={`${visible ? '.active-overlay' : ''} z-90 top-0 left-0 h-full w-full p-4 bg-black bg-opacity-75 ${position} ${visible ? '' : 'hidden'} ${className || ''}`}
      style={style}
    >
      <div style={bodyStyle} className={bodyClassName}>
        {children}
      </div>
    </div>
  )
}

Overlay.Loading = LoadingOverlay
Overlay.Error = ErrorOverlay

export default Overlay