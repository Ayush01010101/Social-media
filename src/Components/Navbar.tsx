import { useState } from "react";
import { CircleUser, Menu, X } from "lucide-react";
import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { SignInWithGoogle, User } = useAuth()

  return (
    <nav className="fixed border-[1px] rounded-xl border-gray-800 top-0 left-0 w-full z-[10] p-3 bg-[rgba(10,10,10,0.8)]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-3 px-6">
        {/* Left: Logo */}
        <div className="font-bold text-2xl text-white"><span className="text-purple-700">Charcha</span> <span className="text-gray-200">Point</span></div>

        <div className="hidden  md:flex items-center gap-6">
          <Link
            to="/"
            className="text-white no-underline  text-base hover:text-gray-300 transition"
          >
            Home
          </Link>
          <Link
            to="/createpost"
            className="text-white no-underline  text-base hover:text-gray-300 transition"
          >
            Create Post
          </Link>
          <Link
            to="/communities"
            className="text-white no-underline font-medium text-base hover:text-gray-300 transition"
          >
            Communities
          </Link>
          <Link
            to="/createcommunity"
            className="text-white no-underline font-medium text-base hover:text-gray-300 transition"
          >
            Create Communities
          </Link>
        </div>

        {/* Continue with Google button (desktop) */}
        <div className="hidden md:flex items-center ml-8">
          {!User ? <button onClick={SignInWithGoogle} className="bg-gray-100 hover:scale-105  flex justify-center items-center gap-2 cursor-pointer text-black font-semibold text-base rounded px-3 py-2 shadow hover:bg-gray-100 transition">
            <div className="h-6 flex w-6">
              <img src="/Assets/google.svg" />
            </div>
            Continue with Google
          </button>
            : <div className="flex justify-center items-center gap-3">
              <img className="h-10 rounded-xl " src={`${User.user_metadata.avatar_url}`} />
              <span className="text-white">{User.email?.split('@')[0]}</span>

            </div>}
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white text-2xl ml-4"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {
        menuOpen && (
          <div className="flex flex-col bg-black/95 fixed top-[60px] left-0 w-full z-[200] px-5 py-6 gap-6 md:hidden">
            <Link
              to="/"
              className="text-white no-underline font-medium text-lg mb-2 hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/create-post"
              className="text-white no-underline font-medium text-lg mb-2 hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Create Post
            </Link>
            <Link
              to="/communities"
              className="text-white no-underline font-medium text-lg mb-2 hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Communities
            </Link>
            <Link
              to="/createcommunity"
              className="text-white  no-underline font-medium  mb-2 hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >

            </Link>
            <button className="bg-white text-black font-semibold text-base rounded px-5 py-2 shadow mt-4 self-start hover:bg-gray-100 transition">
              Continue with Google
            </button>
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;
