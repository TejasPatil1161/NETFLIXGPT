import React, { useEffect } from "react";
import { NETFLIX_LOGO } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doSignout } from "../utils/authenticate";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../store/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = async () => {
    try {
      await doSignout();
    } catch (error) {
      console.log("An error occured while Signing out:", error);
    }
  };

  // Required to be present for keeping track of auth. Act as a listener for the whole app.
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
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
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when components unmount
    return () => unSubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="md:fixed w-full lg:px-12 md:px-8 px-4 py-6 bg-black md:bg-transparent md:bg-gradient-to-b md:from-black flex justify-between z-50">
      <img src={NETFLIX_LOGO} alt="logo" className="md:w-44 w-36" />
      {user && (
        <div className="flex justify-center items-center">
          <img
            src={user?.photoURL}
            alt="avatar"
            className="w-12 h-12 rounded-md"
          />
          <button className="ml-2 text-white" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
