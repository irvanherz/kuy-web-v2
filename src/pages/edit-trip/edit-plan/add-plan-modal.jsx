import Button from "components/button";
import DurationInput from "components/duration-input";
import Form from "components/form";
import Input from "components/input";
import LocationSelector from "components/location-selector";
import Modal from "components/modal";
import { cloneElement, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTripPlan } from "redux/actions/trip";

export default function AddPlanModal({ trip, priority=0, children, preceeding = null, afterCreated }) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const mutationStatus = useSelector(state => state.trip.queryById[trip.id]?.status || 'idle')

  const handleShow = () => setVisible(true)
  const handleHide = () => setVisible(false)

  const handleSubmitData = async values => {
    const data = {
      title: values.title,
      description: values.description,
      duration: values.duration,
      priority,
    }
    const created = await dispatch(createTripPlan(trip.id, data))
    if(created) {
      afterCreated && afterCreated(created)
      reset()
      handleHide()
    }
  }

  return (
    <>
      {children && cloneElement(children, { onClick: handleShow })}
      <Modal
        visible={visible}
        title="Tambah Rencana"
        description="Traveler suka perjalanan yang jelas penjadwalannya. Jangan lupakan itu."
        onVisibleChange={setVisible}
        actions={[
          <Button variant='secondary' onClick={handleHide}>Batal</Button>,
          <Button loading={mutationStatus === 'loading'} variant='primary' onClick={handleSubmit(handleSubmitData)}>Tambahkan</Button>
        ]}
      >
        <Form>
          <Form.Item label='Judul' description='Judul/nama aktivitas.'>
            <Input placeholder='Judul' {...register('title')} />
          </Form.Item>
          <Form.Item label='Deskripsi singkat' description='Penjelasan singkat tentang aktivitas yang dilakukan.'>
            <Input.TextArea placeholder='Deskripsi singkat'  {...register('description')} />
          </Form.Item>
          <Form.Item label='Durasi' description='Estimasi lama durasi aktivitas'>
            <Controller name='duration' control={control} render={({ field }) => (
              <DurationInput
                value={field.value || undefined}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )} />
          </Form.Item>
          <Form.Item label='Lokasi' description='Pilih lokasi aktivitas jika ada. Menambah detail lokasi yang tepat dan jelas sangat dianjurkan.'>
            <Controller name='place' control={control} render={({ field }) => (
              <LocationSelector 
                value={field.value || undefined}
                onChange={field.onChange}/>
            )} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}