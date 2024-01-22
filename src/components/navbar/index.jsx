import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../App.css";

const Navbar = () => {
  return (
    <div className="grid h-screen place-content-center0">
      <SideStaggerNavigation />
    </div>
  );
};

const NUM_LINES = 30;

const navItems = [
  { position: 1, title: "Home" },
  { position: 8, title: "About" },
  { position: 20, title: "Services" },
  { position: 25, title: "Pricing" },
];

const SideStaggerNavigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseY = useMotionValue(Infinity);

  return (
    <motion.nav
      onMouseMove={(e) => {
        mouseY.set(e.clientY);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        mouseY.set(Infinity);
        setIsHovered(false);
      }}
      className="sidebar fixed right-0 top-0 flex h-screen flex-col items-end justify-between py-4 pl-8"
    >
      {Array.from(Array(NUM_LINES).keys()).map((i) => {
        const linkContent = navItems.find((item) => item.position === i + 1);

        return (
          <LinkLine
            title={linkContent?.title}
            isHovered={isHovered}
            mouseY={mouseY}
            key={i}
          />
        );
      })}
    </motion.nav>
  );
};

const SPRING_OPTIONS = {
  mass: 1,
  stiffness: 200,
  damping: 15,
};

const LinkLine = ({ mouseY, isHovered, title }) => {
  const ref = useRef(null);
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();

    return val - (bounds?.y || 0) - (bounds?.height || 0) / 2;
  });

  const lineWidthRaw = useTransform(distance, [-80, 0, 80], [15, 100, 15]);
  const lineWidth = useSpring(lineWidthRaw, SPRING_OPTIONS);

  const linkWidth = useSpring(25, SPRING_OPTIONS);

  useEffect(() => {
    if (isHovered) {
      linkWidth.set(150);
    } else {
      linkWidth.set(25);
    }
  }, [isHovered]);

  if (title) {
    return (
      <a href="#">
        <motion.div
          ref={ref}
          className="group relative bg-green-200 transition-colors hover:bg-green-500"
          style={{ width: linkWidth, height: 2 }}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-green-200 transition-colors group-hover:text-green-500"
              >
                {title}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </a>
    );
  } else {
    return (
      <motion.div
        ref={ref}
        className="relative bg-green-100"
        style={{ width: lineWidth, height: 2 }}
      />
    );
  }
};

LinkLine.propTypes = {
  mouseY: PropTypes.object.isRequired,
  isHovered: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

export default SideStaggerNavigation;
Navbar();
