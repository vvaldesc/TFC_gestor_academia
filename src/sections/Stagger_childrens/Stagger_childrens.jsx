import { motion } from "framer-motion";
import "./Stagger_childrens.css";

const Sphere = () => {
  return (
    <motion.div
    style={{ backgroundColor: 'grey' }}
      className="sphere"
    />
  );
};

const Card_promo = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: { scale: 0 },
        show: { scale: 1 },
      }}
      whileHover={{ scale: 1.5 }}
      whileFocus={{ scale: 1.1 }}
      className="section-div-promo"
    >
      <Sphere/>
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
      exit="hidden"
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-4"
    >
    <Card_promo>
      <p style={{ color: 'white' }}>Contenido</p>
    </Card_promo>
    <Card_promo>
      <p style={{ color: 'white' }}>Contenido</p>
    </Card_promo>
    <Card_promo>
      <p style={{ color: 'white' }}>Contenido</p>
    </Card_promo>
    </motion.section>
  );
}
