import { useState } from "react";
import { CircleUser, Settings, Menu, X, Home, Users, Plus, Bell } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { SignInWithGoogle, User } = useAuth();
  const ActivePath = useLocation().pathname;

  const getNavLinkClass = (path: string, base: string, active: string) =>
    ActivePath === path ? `${base} ${active}` : base;

  // Bottom nav config
  const bottomItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/communities", label: "Communities", icon: Users },
    { to: "/create-post", label: "", icon: Plus, center: true }, // big center +
    { to: "/notifications", label: "Notifications", icon: Bell },
    { to: "/profile", label: "Profile", icon: CircleUser },
  ];

  return (
    <nav className="fixed border-[1px] rounded-xl border-gray-800 top-0 left-0 w-full z-[10] p-3 bg-[rgba(10,10,10,0.8)]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-3 px-6">
        {/* Left: Logo */}
        <div className="font-bold flex gap-1 text-2xl text-white">
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

        {/* Search bar (desktop) */}
        <div className="hidden md:flex items-center ml-8 flex-1 max-w-xs">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full bg-transparent border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-gray-400 pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
            </span>
          </div>
        </div>

        {/* Desktop right */}
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
        {bottomItems.map(({ to, label, icon: Icon, center }) => (
          <Link
            key={to}
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
  );
};

export default Navbar;

