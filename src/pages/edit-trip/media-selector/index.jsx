import { Tab } from "@headlessui/react";
import { cloneElement, useMemo, useState } from "react";
import Button from "../../../components/button";
import Modal from "../../../components/modal";
import MediaList from "./media-list";

export default function MediaSelector({ children, visible, defaultVisible, onChangeVisible, onSelected }) {
  const [internalVisible, setInternalVisible] = useState()
  const [selected, setSelected] = useState([])

  const computedVisible = useMemo(() => {
    let v = visible === undefined ? internalVisible : visible
    v = v === undefined ? defaultVisible : v
    return v ? true : false
  }, [visible, internalVisible, defaultVisible])

  const triggerChangeVisible = newVisible => {
    if (visible === undefined) setInternalVisible(newVisible)
    if (onChangeVisible) onChangeVisible(newVisible)
  }

  const handleClose = () => triggerChangeVisible(false)
  const handleShow = () => triggerChangeVisible(true)

  const handleSelect = () => {
    triggerChangeVisible(false)
    onSelected && onSelected(selected)
  }

  return (
    <>
      {children && cloneElement(children, { onClick: handleShow })}
      <Modal
        destroyOnClose
        title="Select Media"
        visible={computedVisible}
        onVisibleChange={triggerChangeVisible}
        actions={[
          <Button onClick={handleClose}>Close</Button>,
          <Button onClick={handleSelect}>Add Selected</Button>,
        ]}
      >
        <MediaList selected={selected} onSelectedChange={setSelected} />
      </Modal>
    </>
  )
}