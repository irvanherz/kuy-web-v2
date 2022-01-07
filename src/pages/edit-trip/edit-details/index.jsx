import Form from "components/form";
import useSnackbar from "components/snackbar/use-snackbar";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { updateTrip } from "../../../redux/actions/trip";

export default function EditDetails({ trip }) {
  const snackbar = useSnackbar()
  const dispatch = useDispatch()
  const tripId = trip?.id
  const mutationStatus = useSelector(state => state.trip.mutationById[tripId]?.status || 'idle')
  const { reset, register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

  const handleSubmitData = values => {
    const update = { ...values }
    dispatch(updateTrip(trip.id, update))
  }

  useEffect(() => {
    trip && reset({
      title: trip.title,
      description: trip.description,
      // tags: trip.tags || []
    })
  }, [reset, trip])

  const handleTest = () => {
    snackbar.show({title: 'OK'})
  }

  return (
    <Form className="p-4" onSubmit={handleSubmit(handleSubmitData)}>
      <Form.Item label='Judul Perjalanan'>
        <Input
          placeholder='Judul perjalanan'
          {...register("title", { required: true })}
        />
      </Form.Item>
      <Form.Item label='Deskripsi Perjalanan' description="Deskripsikan perjalanan Anda secara terperinci.">
        <Input.TextArea
          rows={5}
          placeholder='Deskripsi perjalanan'
          {...register("description", { required: true })}
        />
      </Form.Item>
      <Form.Item label='Label' description="Tambahkan label/tag untuk memudahkan pengunjung menemukan perjalanan Anda. Masing-masing tag dipisah dengan tanda koma">
        <Input.Tags
          placeholder='Deskripsi perjalanan'
        />
      </Form.Item>
      <div className="flex items-center justify-between">
        <Button loading={mutationStatus === 'loading'} type='submit'>Update</Button>
      </div>
      <div className="flex items-center justify-between">
        <Button type='button' onClick={handleTest}>Test</Button>
      </div>
    </Form>
  )
}