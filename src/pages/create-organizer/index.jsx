import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ContentHeader from "../../components/content-header";
import Overlay from "../../components/overlay";
import Loading from "../../components/overlay/loading";
import { createOrganizer } from "../../redux/actions/organizer";

const CreateOrganizer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const createStatus = useSelector(state => state.organizer.mutationById[0]?.status || 'idle')

  const onSubmit = async data => {
    console.log(data);
    const created = await dispatch(createOrganizer(data))
    if(created) navigate(`/organizers/mine`, { replace: true })
  }

  return (
    <div>
      <ContentHeader
        title="Buat Akun Pengelola Perjalanan"
        subtitle="Masukkan detail akun pengelola perjalanan anda pada form berikut ini"
      />
      <div className='container mx-auto m-5'>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama Pengelola</label>
            <input
              className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border ${errors.title ? 'border-red-500' : ''}`}
              type="text"
              placeholder="Nama Organisasi/Perusahaan Pengelola"
              {...register("name", { required: true })}
            />
            {errors.title?.type === 'required' && <p className="text-red-500 text-sm italic">Nama pengelola tidak boleh kosong</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Deskripsi</label>
            <textarea
              className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border ${errors.description ? 'border-red-500' : ''}`}
              type="text" placeholder="Masukkan deskripsi singkat tentang akun pengelola Anda."
              {...register("description", { required: true })}
            />
            {errors.description?.type === 'required' && <p className="text-red-500 text-sm italic">Deskripsi tidak boleh kosong</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Alamat</label>
            <input
              className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border ${errors.description ? 'border-red-500' : ''}`}
              type="text" placeholder="Alamat"
              {...register("address", { required: true })}
            />
            {errors.addrees?.type === 'required' && <p className="text-red-500 text-sm italic">Alamat tidak boleh kosong</p>}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Buat Akun Pengelola</button>
          </div>
        </form>
      </div>
      <Overlay.Loading visible={createStatus === 'loading'} position='fixed' title='Tunggu Sebentar' subtitle='Server sedang membuat akun Anda...'/>
    </div>
  )
}

export default CreateOrganizer