import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentHeader from "../../components/content-header";
import DatePicker from 'react-datepicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import moment from 'moment-timezone'
import { Popover, RadioGroup } from "@headlessui/react";
import Picker from 'react-datetime';
import "./react-datetime.css";
import PhoneInput from "../../components/phone-input";
import { setupProfile } from "../../redux/actions/auth";
import Button from "../../components/button";
import Input from "../../components/input";
import { useNavigate } from 'react-router-dom'

const schema = yup.object({
  email: yup.string().email('Email tidak valid').required('Email harus diisi'),
  first_name: yup.string().required('Nama depan harus diisi').matches(/^[A-Za-z ]*$/, 'Nama depan tidak valid'),
  last_name: yup.string().required('Nama belakang harus diisi').matches(/^[A-Za-z ]*$/, 'Nama belakang tidak valid'),
  gender: yup.string().required('Jenis kelamin harus dipilih'),
  dob: yup.object()
    .required('Tanggal lahir tidak boleh kosong')
    .test("is-moment",
      "Tanggal lahir tidak valid",
      value => moment.isMoment(value)
    )
}).required();

export default function SetupAccount() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profileData = useSelector(state => state.auth.profile.data)
  const profileMutationStatus = useSelector(state => state.auth.profile.mutation.status)
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = values => {
    console.log(values);
    const ok = dispatch(setupProfile({
      ...values,
      dob: moment(values.dob).format('YYYY-MM-DD')
    }))
    if(ok) navigate(-1)()
  }

  useEffect(() => {
    if (profileData) {
      const values = {
        email: profileData.email,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        gender: profileData.gender,
        dob: profileData.dob ? moment(profileData.dob) : undefined,
        phone: profileData.phone,
      }
      Object.keys(values).forEach(key => setValue(key, values[key]))
    }
    // profileData && setValues(profileData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData])

  return (
    <div>
      <ContentHeader
        title={<>Selamat Datang di <span className='text-yellow-100'>LiburanAja</span></>}
        subtitle='Anda baru saja mendaftarkan akun Anda di LiburanAja. Sebelum melanjutkan, mohon untuk melengkapi profil Anda terlebih dauhulu.'
      />
      <div className='container mx-auto'>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <Input 
              id='email'
              placeholder="Email"
              variant={errors.email ? 'danger' : 'default'}
              disabled
              {...register("email")}
            />
            <p className="text-red-500 text-sm italic">{errors.email?.message}</p>
          </div>
          <div className='flex'>
            <div className="flex-1 mb-6 mr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">Nama Depan</label>
              <Input
                id='first_name'
                placeholder="John"
                variant={errors.first_name ? 'danger' : 'default'}
                {...register("first_name")}
              />
              <p className="text-red-500 text-sm italic">{errors.first_name?.message}</p>
            </div>
            <div className="flex-1 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">Nama Belakang</label>
              <Input
                id='last_name'
                placeholder="Doe"
                variant={errors.last_name ? 'danger' : 'default'}
                {...register("last_name")}
              />
              <p className="text-red-500 text-sm italic">{errors.last_name?.message}</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Jenis Kelamin</label>
            <Controller name='gender' control={control} render={({ field }) => (
              <RadioGroup
                id='gender'
                value={field.value || undefined}
                onChange={field.onChange}
                onBlur={field.onBlur}
                className='flex space-x-4'
              >
                <RadioGroup.Option type='button' as='button' value="male">
                  {({ checked }) => (
                    <div className={`flex-1 p-3 border ${checked ? 'bg-blue-100 font-bold' : 'bg-gray-100'}`}>
                      Laki-laki
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option type='button' as='button' value="female">
                  {({ checked }) => (
                    <div className={`flex-1 p-3 border ${checked ? 'bg-blue-100 font-bold' : 'bg-gray-100'}`}>
                      Perempuan
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option type='button' as='button' value="other">
                  {({ checked }) => (
                    <div className={`flex-1 p-3 border ${checked ? 'bg-blue-100 font-bold' : 'bg-gray-100'}`}>
                      Lainnya
                    </div>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
            )} />
            <p className="text-red-500 text-sm italic">{errors.gender?.message}</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">Tanggal Lahir</label>
            <Controller name='dob' control={control} render={({ field }) => (
              <Picker
                name={field.name}
                dateFormat='D MMMM YYYY'
                locale='id-ID'
                initialValue={null}
                timeFormat={false}
                value={field.value || null}
                {...field}
                isValidDate={(currentDate, selectedDate) => currentDate.isSameOrBefore(moment())}
                renderInput={(props, openCalendar, closeCalendar) => {
                  return (
                    <input
                      value={props.value}
                      readOnly
                      onClick={openCalendar}
                      type="text"
                      className={`mb-3 block w-full rounded-md shadow-sm ${errors.dob ? 'border-red-600 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50' : 'border-gray-300 focus:ring focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50'}`}
                    />
                  )
                }}
              />
            )} />
            <p className="text-red-500 text-sm italic">{errors.dob?.message}</p>
          </div>
          <div className="flex-1 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">Nomor HP</label>
            <Controller name='phone' control={control} render={({ field }) => (
              <PhoneInput
                maxLength={13}
                value={field.value || null}
               {...field}
              />
            )} />
            <p className="text-red-500 text-sm italic">{errors.phone?.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <Button type='submit' variant='secondary' loading={profileMutationStatus === 'loading'}>Update Profil Saya</Button>
          </div>
        </form>
      </div>
    </div>
  )
}