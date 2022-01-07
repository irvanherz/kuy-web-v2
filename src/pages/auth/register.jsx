import Button from "components/button";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";

const auth = getAuth();

export default function Register(){
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const handleFacebookAuth = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      });
  }

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      });
  }

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Email</label>
          <input
            className={`shadow appearance-none rounded w-full py-2 px-3 bg-white bg-opacity-50 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border ${errors.email ? 'border-red-500' : ''}`}
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === 'required' && <p className="text-red-500 text-sm italic">Email tidak boleh kosong</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Kata Sandi</label>
          <input
            className={`shadow appearance-none rounded w-full py-2 px-3 bg-white bg-opacity-50 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border ${errors.password ? 'border-red-500' : ''}`}
            type="password" placeholder="Kata Sandi"
            {...register("password", { required: true })}
          />
          {errors.password?.type === 'required' && <p className="text-red-500 text-sm italic">Kata sandi tidak boleh kosong</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-confirmation">Ulangi Kata Sandi</label>
          <input
            className={`shadow appearance-none rounded w-full py-2 px-3 bg-white bg-opacity-50 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border ${errors.password_confirmation ? 'border-red-500' : ''}`}
            type="password" placeholder="Ulangi Kata Sandi"
            {...register("password_confirmation", { required: true })}
          />
          {errors.password_confirmation?.type === 'required' && <p className="text-red-500 text-sm italic">Kata sandi tidak boleh kosong</p>}
        </div>
        <div className='space-y-2'>
          <div className='w-full'>
            <Button className='w-full' type='submit'>Daftar</Button>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleFacebookAuth} variant='primary' className='block w-full text-center' type='button'><img className='inline' src={`${process.env.PUBLIC_URL}/assets/icons/facebook-white-32x32.png`} alt="Lanjutkan dengan Facebook" /></Button>
            <Button onClick={handleGoogleAuth} variant='danger' className='block w-full text-center' type='button'><img className='inline' src={`${process.env.PUBLIC_URL}/assets/icons/google-white-32x32.png`} alt="Lanjutkan dengan Google" /></Button>
          </div>
        </div>
      </form>
    </div>
  )
}