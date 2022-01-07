import { XCircleIcon } from "@heroicons/react/solid"
import classNames from "classnames"
import Overlay, { OverlayProps } from "./index"

interface ErrorOverlayProps extends OverlayProps {
  title?: string,
  subtitle?: string,
}


export default function Loading({ title = 'Loading...', subtitle, bodyClassName, ...props }: ErrorOverlayProps) {
  return (
    <Overlay bodyClassName={classNames('absolute left-0 w-full top-1/2 -translate-1/2 text-center', bodyClassName)} {...props}>
      <div className='mb-2'>
        <XCircleIcon className='inline w-7 h-7 text-red-500'/>
      </div>
      <div className='font-bold text-white'>{title}</div>
      <div className='text-gray-100'>{subtitle}</div>
    </Overlay>
  )
}