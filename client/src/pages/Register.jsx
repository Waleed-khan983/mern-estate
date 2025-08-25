 import {Link} from 'react-router-dom'

const Register = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
        />
        <button
        
          className="bg-slate-700 text-white p-3 rounded-xl font-bold uppercase hover:opacity-95 disabled:opacity-80"
        >
          sign Up
        </button>
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Have and account?</p>
        <Link to={"/login"}>
        <span className='text-blue-700'>Login</span>
        </Link>

      </div>
    </div>
  );
};

export default Register;
