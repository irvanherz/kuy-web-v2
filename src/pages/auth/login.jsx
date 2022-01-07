import { useForm } from "react-hook-form";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Button from "components/button";
import { useState } from "react";
import Overlay from "components/overlay";

const auth = getAuth();

export default function Login() {
  const [isProcessing, setIsProcessing] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async data => {
    setIsProcessing(true)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      })
      .finally(() => setIsProcessing(false))
  }

  const handleFacebookAuth = () => {
    const provider = new FacebookAuthProvider();
    setIsProcessing(true)
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      })
      .finally(() => setIsProcessing(false))
  }

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();
    setIsProcessing(true)
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      })
      .finally(() => setIsProcessing(false))
  }

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Email</label>
          <input
            className={`shadow appearance-none rounded w-full py-2 px-3 bg-white bg-opacity-50 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border ${errors.title ? 'border-red-500' : ''}`}
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === 'required' && <p className="text-red-500 text-sm italic">Email tidak boleh kosong</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Kata Sandi</label>
          <input
            className={`shadow appearance-none rounded w-full py-2 px-3 bg-white bg-opacity-50 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border ${errors.title ? 'border-red-500' : ''}`}
            type="password" placeholder="Kata Sandi"
            {...register("password", { required: true })}
          />
          {errors.password?.type === 'required' && <p className="text-red-500 text-sm italic">Kata sandi tidak boleh kosong</p>}
        </div>
        <div className='space-y-2'>
          <div className='w-full'>
            <Button className='w-full' type='submit'>Masuk</Button>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleFacebookAuth} variant='primary' className='block w-full text-center' type='button'><img className='inline' src={`${process.env.PUBLIC_URL}/assets/icons/facebook-white-32x32.png`} alt="Lanjutkan dengan Facebook"/></Button>
            <Button onClick={handleGoogleAuth} variant='danger' className='block w-full text-center' type='button'><img className='inline' src={`${process.env.PUBLIC_URL}/assets/icons/google-white-32x32.png`} alt="Lanjutkan dengan Google" /></Button>
          </div>
        </div>
      </form>
      <Overlay.Loading visible={isProcessing} title='Processing' subtitle='Your authentication process is running...' />
    </div>
  )
}