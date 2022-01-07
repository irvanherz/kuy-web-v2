import Button from "components/button";
import Modal from "components/modal";
import { cloneElement, useRef } from "react";

export default function TripBookingModal({ children }) {
  const modalRef = useRef()

  const handleClick = () => {
    modalRef.current.setVisibility(true)
  }

  const handleCancel = () => {
    modalRef.current.setVisibility(false)
  }

  return (
    <>
      {children && cloneElement(children, { onClick: handleClick })}
      <Modal
        title="Booking Perjalanan"
        description="Silahkan pilih harga dan jadwal yang Anda inginkan."
        ref={modalRef}
        actions={[
          <Button variant='secondary' onClick={handleCancel}>Batal</Button>,
          <Button>Beli Sekarang</Button>
        ]}
      >
        Hehehhe
      </Modal>
    </>
  )
}