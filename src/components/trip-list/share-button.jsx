import { cloneElement, useState } from "react";
import Modal from "../modal";

export default function ShareButton({ children }) {
  const [visible, setVisible] = useState(false)

  const handleTrigger = () => setVisible(!visible)

  return (
    <>
      {children && cloneElement(children, { ...children.props, onClick: handleTrigger })}
      <Modal 
        visible={visible} 
        onVisibleChange={v => setVisible(v)}
        // className='justify-center'
        bodyClassName='space-x-3 flex justify-center'
        maxWidth={400}
      >
        <button>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/facebook-48x48.png`} alt=''/>
        </button>
        <button>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/twitter-48x48.png`} alt='' />
        </button>
        <button>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/whatsapp-48x48.png`} alt='' />
        </button>
        <button>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/mail-48x48.png`} alt='' />
        </button>
        <button>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/copy-48x48.png`} alt='' />
        </button>
      </Modal>
    </>
  )
}