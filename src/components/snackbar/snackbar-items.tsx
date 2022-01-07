import { XCircleIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SnackbarContext from "./context";
import { SnackbarProps } from "./snackbar-provider";

interface SnackbarItemProps {
  snackbar: SnackbarProps,
}

function SnackbarItem({ snackbar }: SnackbarItemProps) {
  const context = useContext(SnackbarContext)
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (snackbar.ttl) {
      timeout = setTimeout(() => {
        context.destroy(snackbar.id)
      }, snackbar.ttl)
    }
    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [])

  const handleDestroy = () => context.destroy(snackbar.id)

  return (
    <div className={classNames('relative m-2 rounded-xl text-white bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm shadow-lg', context.className)} style={context.style}>
      <div className='px-4 py-2'>
        <div className='font-bold'>{snackbar.title}</div>
        <div className='text-sm'>{snackbar.description}</div>
      </div>
      <div className='absolute bg-white -top-2 -right-2 rounded-full w-5 h-5'>
        <button onClick={handleDestroy}><XCircleIcon className='w-5 h-5 text-red-400'/></button>
      </div>
    </div>
  )
}


export default function SnackbarItems() {
  const context = useContext(SnackbarContext)
  console.log(context.snackbars);

  const [portal] = useState(() => {
    const div = document.createElement('div')
    return div
  })

  useEffect(() => {
    const snackbarRoot = document.getElementById('snackbar-root')
    console.log('ssss', snackbarRoot);

    snackbarRoot?.appendChild(portal)
    return () => {
      snackbarRoot?.removeChild(portal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return createPortal(
    <div className={context.containerClassName} style={context.containerStyle}>
      {context.snackbars.map(snack => <SnackbarItem key={snack.id} snackbar={snack} />)}
    </div>,
    portal
  )
}