import { cloneElement, useState } from "react";
import Button from "../button";
import Modal from "../modal";

export default function ArchiveButton({ children }) {
  const [visible, setVisible] = useState(false)

  const handleTrigger = () => setVisible(!visible)

  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => setVisible(false)

  return (
    <>
      {children && cloneElement(children, { ...children.props, onClick: handleTrigger })}
      <Modal
        visible={visible}
        onVisibleChange={v => setVisible(v)}
        // className='justify-center'
        bodyClassName='space-x-3 flex justify-center'
        maxWidth={600}
        title='Arsipkan Perjalanan'
        description="Apakah anda yakin ingin mengarsipkan perjalanan ini? Perjalanan yang diarsipkan akan otomatis dihapus setelah 7 hari."
        actions={[
          <Button onClick={handleOk} variant='danger-link'>Ya</Button>,
          <Button onClick={handleCancel} variant='link'>Batal</Button>
        ]}
      >
      </Modal>
    </>
  )
}