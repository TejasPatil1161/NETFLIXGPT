import React, { useEffect, useState } from "react";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doSignout } from "../utils/authenticate";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../store/userSlice";
import { toggleGPTSearchView } from "../store/GPTSlice";
import { changeLanguage } from "../store/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const showGPTSearch = useSelector((store) => store.GPT.showGPTSearch);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [menuOpen, setMenuOpen] = useState(false);

  // Required to keep track of auth and act as a listener for the whole app.
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when the component unmounts
    return () => unSubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = async () => {
    try {
      await doSignout();
    } catch (error) {
      console.log("An error occurred while Signing out:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  const handleGPTSeachView = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="md:fixed w-full lg:px-12 md:px-8 px-4 py-6 bg-black md:bg-transparent md:bg-gradient-to-b md:from-black flex justify-between z-50">
      <img
        src={NETFLIX_LOGO}
        alt="logo"
        className={user ? "md:w-40 w-36" : "md:w-44 w-36"}
      />
      {user && (
        <div className="relative flex justify-center items-center">
          {showGPTSearch && (
            <div className="bg-black rounded">
              <select
                className="p-2 bg-gray-500 bg-opacity-55 text-white rounded"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={handleGPTSeachView}
            className="bg-red-600 text-white mx-6 px-3 p-2 rounded-lg hover:bg-red-700 active:scale-95 font-semibold"
          >
            GPT Search
          </button>
          <img
            src={user?.photoURL}
            alt="avatar"
            className="w-10 h-10 rounded-md cursor-pointer"
            onClick={toggleMenu} // Show/hide the logout menu
          />
          {menuOpen && (
            <div className="absolute top-16 right-0 bg-gray-500 rounded-md min-w-32">
              <button
                className="p-2 w-full text-white font-semibold"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
