import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { useNavigate } from "@tanstack/react-router";
const ButtonWrapper = ({ linkTo }) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  const navigate = useNavigate(); // Add useNavigate

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" },
      );
    };

    const currentBtnRef = btnRef.current;

    currentBtnRef.addEventListener("mousemove", handleMouseMove);
    currentBtnRef.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentBtnRef.removeEventListener("mousemove", handleMouseMove);
      currentBtnRef.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [btnRef, linkTo]);

  return (
    <Link to="/samplefinder">
      <motion.button
        whileTap={{ scale: 0.985 }}
        ref={btnRef}
        className="relative w-full max-w-xs overflow-hidden rounded-lg bg-transparent px-4 py-3 text-lg font-medium text-white border border-neutral-700 shadow-[0px_0px_6px_rgba(255,_255,_255,_0.),_15px_15px_15px_rgba(0,_0,_0,_1)]"
        onClick={() => navigate(linkTo)} // Use navigate on button click
      >
        <span className="pointer-events-none relative z-10 mix-blend-difference">
          lemme try
        </span>
        <span
          ref={spanRef}
          className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-green-200"
        />
      </motion.button>
    </Link>
  );
};

ButtonWrapper.propTypes = {
  linkTo: PropTypes.string,
};

export default ButtonWrapper;
