import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { useRef } from "react";
import PropTypes from "prop-types";

const OppoScroll = ({ items }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <>
      <div className="bg-white text-black p-4 grid place-items-center">
        <FiArrowDown className="text-xl" />
      </div>
      <section ref={targetRef} className="flex bg-black text-white">
        <Content content={items} />
        <Images content={items} scrollYProgress={scrollYProgress} />
      </section>
      <div className="bg-black text-white p-4 grid place-items-center">
        <FiArrowUp className="text-xl" />
      </div>
    </>
  );
};

OppoScroll.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const Content = ({ content }) => {
  return (
    <div className="w-full">
      {content &&
        content.map(({ id, title, description }, idx) => (
          <div
            key={id}
            className={`p-8 h-screen flex flex-col justify-between ${
              idx % 2 ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <h3 className="text-3xl font-medium">{title}</h3>
            <p className="font-light w-full max-w-md">{description}</p>
          </div>
        ))}
    </div>
  );
};

Content.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    }),
  ),
};

const Images = ({ content, scrollYProgress }) => {
  const top = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${(content?.length - 1) * 100}vh`, "0vh"],
  );

  return (
    <div className="h-screen overflow-hidden sticky top-0 w-24 md:w-full">
      <motion.div style={{ top }} className="absolute left-0 right-0">
        {content &&
          [...content]
            .reverse()
            .map(({ img, id, title }) => (
              <img
                key={id}
                alt={title}
                className="h-screen w-full object-cover"
                src={img}
              />
            ))}
      </motion.div>
    </div>
  );
};

Images.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    }),
  ),
  scrollYProgress: PropTypes.object.isRequired,
};

export default OppoScroll;
