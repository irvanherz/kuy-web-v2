import Form from "components/form";
import { useForm } from "react-hook-form";
import DurationInput from "../../../components/duration-input";
import Input from "components/input";
import LocationSelector from "../../../components/location-selector";

export default function AddPlan(){
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  return(
    <div>
      <Form.Item label='Judul' description='Judul/nama aktivitas.'>
        <Input placeholder='Judul' />
      </Form.Item>
      <Form.Item label='Deskripsi singkat' description='Penjelasan singkat tentang aktivitas yang dilakukan.'>
        <Input.TextArea placeholder='Deskripsi singkat' />
      </Form.Item>
      <Form.Item label='Durasi' description='Durasi aktivitas'>
        <DurationInput />
      </Form.Item>
      <Form.Item label='Lokasi' description='Pilih lokasi aktivitas jika ada. Menambah detail lokasi yang tepat dan jelas sangat dianjurkan.'>
        <LocationSelector />
      </Form.Item>
    </div>
  )
}