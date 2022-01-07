import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import ContentHeader from "../../components/content-header";
import Input from "../../components/input";
import { createTrip } from "../../redux/actions/trip";

const CreateTrip = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const { organizerId } = params
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const createStatus = useSelector(state => state.trip.mutationById[0]?.status || 'idle')

  const onSubmit = values => {
    const created = dispatch(createTrip(organizerId, values))
    if (created) navigate(`/organizers/${organizerId}/trips/${created.id}/edit`, { replace: true })
  }

  return (
    <div>
      <ContentHeader
        title="Buat Perjalanan Baru"
        subtitle="Masukkan detail perjalanan anda pada form berikut ini."
        actions={
          <Link to={`/organizers/1/trips/create`}>
            <button className="bg-white text-blue-700 hover:bg-blue-400 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"><QuestionMarkCircleIcon className='w-5 h-5 inline' /> Pelajari Lebih Lanjut</button>
          </Link>
        }
      />
      <div className='container mx-auto m-5'>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Judul Perjalanan</label>
            <Input 
              placeholder='Judul perjalanan'
              {...register("title", { required: true })}
            />
            {errors.title?.type === 'required' && <p className="text-red-500 text-sm italic">Title is required</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Deskripsi Perjalanan</label>
            <Input
              placeholder='Deskripsi perjalanan'
              {...register("description", { required: true })}
            />
            {errors.title?.type === 'required' && <p className="text-red-500 text-sm italic">Title is required</p>}
          </div>
          <div className="flex items-center justify-between">
            <Button loading={createStatus === 'loading'} type='submit'>Buat Perjalanan</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTrip