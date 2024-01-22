import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import proptypes from "prop-types";
import SpotifyLoginComponent from "../login";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(!localStorage.getItem("accesstoken"));

  useEffect(() => {
    // Update modal state based on the presence of access token
    setIsOpen(!localStorage.getItem("accesstoken"));
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Hold on a minute!
              </h3>
              <p className="text-center mb-6">
                To use this beautiful app, you need to login with your Spotify
                account.
              </p>
              <div>
                <SpotifyLoginComponent />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: proptypes.bool.isRequired,
  setIsOpen: proptypes.func.isRequired,
};
