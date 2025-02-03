import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import logoDark from "../../assets/Logo-Dark.png";
import logoLight from "../../assets/Logo-Light.png";
import { useTheme } from "../theme-provider";
import {
  accessTokenAtom,
  refresh_tokenAtom,
  isUserExistingAtom,
  idAtom,
  phoneNumberAtom,
  emailAtom,
  trace_idAtom,
  profileIdAtom,
  roleAtom,
  userDashboardDataAtom,
  pinAtom,
} from "../../store/UserAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "../../hooks/use-toast";

export const FloatingNav = ({ navItems, className }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");

  const setRefreshToken = useSetRecoilState(refresh_tokenAtom);
  const setIsUserExisting = useSetRecoilState(isUserExistingAtom);
  const setId = useSetRecoilState(idAtom);
  const setPhoneNumber = useSetRecoilState(phoneNumberAtom);
  const setEmail = useSetRecoilState(emailAtom);
  const setTraceId = useSetRecoilState(trace_idAtom);
  const setProfileId = useSetRecoilState(profileIdAtom);
  const setRole = useSetRecoilState(roleAtom);
  const setUserDashboardData = useSetRecoilState(userDashboardDataAtom);
  const setPin = useSetRecoilState(pinAtom);

  const handleLogout = () => {
    // sessionStorage.setItem("accessToken", "")
    sessionStorage.clear();
    setRefreshToken("");
    setIsUserExisting(false);
    setId("");
    setPhoneNumber("");
    setEmail("");
    setTraceId("");
    setProfileId("");
    setRole("");
    setPin("");
    setUserDashboardData({
      id: null,
      emergency_contact: [],
      medical_detail: [
        {
          blood_group: "",
          blood_donor: "",
          blood_pressure: "",
          diabetes: "",
          cholesterol: "",
          heart_related: "",
        },
      ],
    });
    navigate("/");
    toast({
      title: "Logout",
      description: "You have been logged out successfully",
    });
  };

  const isPostScanPath = location.pathname.startsWith("/scan");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-[90%] sm:max-w-[80%] fixed top-2 sm:top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-opacity-40 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[50] pr-2 pl-4 sm:pl-8 py-2 items-center justify-between space-x-2 sm:space-x-4 bg-opacity-40 backdrop-blur-md border-sky-200 dark:border-sky-700",
          className
        )}
      >
        <Link to="/">
          {theme === "dark" ? (
            <img src={logoDark} alt="Logo" className="h-6 sm:h-8" />
          ) : (
            <img src={logoLight} alt="Logo" className="h-6 sm:h-8" />
          )}
        </Link>
        <div className="hidden sm:flex space-x-2 sm:space-x-4">
          {navItems.map((navItem, idx) => (
            <NavLink
              key={`link=${idx}`}
              to={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 dark:hover:text-neutral-300 hover:text-neutral-500 text-black"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="hidden sm:flex space-x-2 sm:space-x-4">
          {!isPostScanPath &&
            (accessToken ? (
              <Link
                onClick={handleLogout}
                className="border text-xs sm:text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="border text-xs sm:text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full"
              >
                Login
              </Link>
            ))}
          <a
            href="https://dealer.myresqr.life/dealer-kyc"
            className="border text-xs sm:text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full"
          >
            Register as Dealer
          </a>
          <ModeToggle />
        </div>

        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black dark:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-16 inset-x-0 mx-auto w-full bg-white dark:bg-black shadow-lg z-[5000] p-4 rounded-lg"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((navItem, idx) => (
              <NavLink
                key={`link=${idx}`}
                to={navItem.link}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 dark:hover:text-neutral-300 hover:text-neutral-500 text-black"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{navItem.icon}</span>
                <span className="text-sm">{navItem.name}</span>
              </NavLink>
            ))}
            {!isPostScanPath &&
              (accessToken ? (
                <Link
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              ))}
            <ModeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
