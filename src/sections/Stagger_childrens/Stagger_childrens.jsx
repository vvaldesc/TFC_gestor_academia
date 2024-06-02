import { motion } from "framer-motion";
import "./Stagger_childrens.css";

const Sphere = ({ color }) => {
  return (
    <motion.div
      style={{ backgroundColor: color }}
      className="sphere"
    />
  );
};

const Card_promo = ({ children, color }) => {
  return (
    <motion.div
      variants={{
        hidden: { scale: 0 },
        show: { scale: 1 },
      }}
      whileHover={{
         scale: 1.2,
      }}
      className="section-div-promo"
    >
      <Sphere color={color} />
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
    <Card_promo color="red">
      <p className="main-text-promoTitle" style={{ color: 'white' }}>Matricúlate por menos de 100 euros al mes</p>
    </Card_promo>
    <Card_promo color="blue">
      <p className="main-text-promoTitle" style={{ color: 'white' }}>Accede a nuestra tienda y compra artículos cosméticos</p>
    </Card_promo>
    <Card_promo color="green">
      <p className="main-text-promoTitle" style={{ color: 'white' }}>Certificado de experiencia en la estética y peluquería</p>
    </Card_promo>
    </motion.section>
  );
}
