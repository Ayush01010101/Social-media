import { useState } from "react";
import { CircleUser, Settings, Menu, X, Home, Users, Plus, Bell } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import Createpost from "./CreatePost";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { SignInWithGoogle, User } = useAuth();
  const ActivePath = useLocation().pathname;
  const [IsOpenCreatePost, setIsOpenCreatePost] = useState<boolean>(false)
  const navigate = useNavigate();

  const getNavLinkClass = (path: string, base: string, active: string) =>
    ActivePath === path ? `${base} ${active}` : base;

  const bottomItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/communities", label: "Communities", icon: Users },
    { to: "", label: "", icon: Plus, center: true, handleAction: () => setIsOpenCreatePost((prev) => !prev) }, // big center +
    { to: "/notifications", label: "Notifications", icon: Bell },
    { to: "/profile", label: "Profile", icon: CircleUser },
  ];

  return (
    <>
      {IsOpenCreatePost && <div className="fixed mt-24 h-screen w-screen flex justify-center items-center">
        <Createpost handleClick={() => setIsOpenCreatePost((prev) => !prev)} />
      </div>}

      <nav className="fixed border-[1px] rounded-xl border-gray-800 top-0 left-0 w-full z-[10] p-3 bg-[rgba(10,10,10,0.8)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between py-3 px-6">
          {/* Left: Logo */}
          <div
            className="font-bold flex gap-1 text-2xl text-white cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-purple-500">Charcha</span>
            <span>Point</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 ml-8">
            <Link
              to="/"
              className={getNavLinkClass(
                "/",
                "text-white no-underline text-base px-3 py-1 rounded font-medium ",
                "ring-purple-500 bg-purple-900"
              )}
            >
              Home
            </Link>
            <Link
              to="/communities"
              className={getNavLinkClass(
                "/communities",
                "text-white no-underline text-base px-3 py-1 rounded font-medium ",
                "ring-purple-500 bg-purple-900"
              )}
            >
              Communities
            </Link>
            <Link
              to="/createcommunity"
              className={getNavLinkClass(
                "/createcommunity",
                "text-white no-underline text-base px-3 py-1 rounded font-medium ",
                "ring-purple-500 bg-purple-900"
              )}
            >
              Create Community
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 ml-8">
            <button><Bell color="white" /></button>
            <button><Settings color="white" /></button>
            {User ? (
              <img className="h-8 w-8 rounded-full ml-2" src={`${User.user_metadata.avatar_url}`} alt="user avatar" />
            ) : (
              <button onClick={SignInWithGoogle} className="p-3 text-white">continue with google</button>
            )}
          </div>

          {/* Hide hamburger on mobile since we use bottom bar */}
          <button
            className="md:hidden text-white text-2xl ml-4 hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Remove old overlay menu on mobile */}
        {/* Mobile Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#1f1f23] border-t border-gray-800 flex justify-between items-center px-2 py-1">
          {bottomItems.map(({ to, label, icon: Icon, center, handleAction }) => (
            <Link
              key={to}
              onClick={handleAction ? () => handleAction() : () => { }}
              to={to}
              className={`${center ? "relative" : "flex-1"
                } flex flex-col items-center justify-center text-xs ${ActivePath === to ? "text-white" : "text-gray-400"
                }`}
            >
              {center ? (
                <span className="bg-purple-600 rounded-full p-3 -mt-6 shadow-lg">
                  <Icon size={26} className="text-white" />
                </span>
              ) : (
                <>
                  <Icon size={22} />
                  <span className="mt-0.5">{label}</span>
                </>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>

  );
};

export default Navbar;

