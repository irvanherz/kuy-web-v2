import Button from "components/button";
import Form from "components/form";
import Input from "components/input";
import Modal from "components/modal";
import { cloneElement, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTripPrice } from "redux/actions/trip";

export default function AddPriceModal({ trip, visible, onChangeVisible, children }){
  const dispatch = useDispatch()
  const [internalVisible, setInternalVisible] = useState()
  const computedVisible = (visible === undefined ? internalVisible : visible) || false
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  const mutationStatus = useSelector(state => state.trip.queryById[trip.id]?.status || 'idle')

  const triggerChangeVisible = newVisible => {
    if(visible === undefined) setInternalVisible(newVisible)
    onChangeVisible && onChangeVisible(newVisible)
  }

  const handleClick = () => triggerChangeVisible(!computedVisible)
  const handleCancel = () => triggerChangeVisible(false)

  const handleSubmitData = async values => {
    try {
      const ok = dispatch(createTripPrice(trip.id, values))
      if(ok) triggerChangeVisible(false)
    } catch(error) {
      //
    }
  }

  return (
    <>
    {children && cloneElement(children, { onClick: handleClick})}
      <Modal 
        visible={computedVisible} 
        onVisibleChange={triggerChangeVisible}
        title='Tambah Varian Harga'
        actions={[
          <Button variant='secondary' onClick={handleCancel}>Batal</Button>,
          <Button loading={mutationStatus === 'loading'} variant='primary' onClick={handleSubmit(handleSubmitData)}>Tambahkan</Button>
        ]}
      >
        <Form>
          <Form.Item label='Judul' description='Judul Harga'>
            <Input placeholder='Judul' {...register('title')}/>
          </Form.Item>
          <Form.Item label='Deskripsi' description='Deskripsi Harga'>
            <Input.TextArea placeholder='Deskripsi' {...register('description')} />
          </Form.Item>
          <Form.Item label='Harga(Rp)' description='Nominal dalam Rupiah'>
            <Controller name='amount' control={control} render={({ field }) => (
              <Input.Number value={field.value || undefined}
                step={10000}
                placeholder='Harga'
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}