import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md  ">
      <div className="flex mx-auto justify-between items-center   p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-lg flex flex-wrap">
            <span className="text-slate-500">Safi</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 ">
            <Link to='/'>
          <li className="text-slate-700 hidden sm:inline hover:underline hover:text-slate-500 duration-700 transition">
            Home
          </li>
          </Link>
  
           <Link to='/about'>
          <li className="text-slate-700 hidden sm:inline hover:underline hover:text-slate-500 duration-700 transition">
            About
          </li>
          </Link>

          <Link to='/login'>
          <li className="text-slate-700   hover:underline hover:text-slate-500 duration-700 transition">Login</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
