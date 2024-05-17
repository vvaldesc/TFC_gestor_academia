import { motion } from "framer-motion";

const DivPromo = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: { scale: 0 },
        show: { scale: 1 },
      }}
      className="w-36 h-36 bg-black"
    >
      {children}
    </motion.div>
  );
};

export default function StaggerChildren() {
  return (
    <motion.section
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.5,
          },
        },
      }}
      initial="hidden"
      animate="show"
      className="flex flex-wrap justify-center gap-4"
    >
    <DivPromo>
      <p style={{ color: 'white' }}>Contenido</p>
    </DivPromo>
    <DivPromo>
      <p style={{ color: 'white' }}>Contenido</p>
    </DivPromo>
    <DivPromo>
      <p style={{ color: 'white' }}>Contenido</p>
    </DivPromo>
    </motion.section>
  );
}
