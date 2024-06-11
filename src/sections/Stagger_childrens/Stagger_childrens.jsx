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
      className="section-div-promo flex items-center justify-center"
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
      transition={{ duration: 0.8 }}
      className="flex flex-wrap justify-center gap-4 text-center"
    >
      <div style={{ cursor: 'pointer' }} onClick={() => window.location.href='/perfil'}>
        <Card_promo color="black">
          <h2 className="main-text-promoTitle" style={{ color: 'white', fontSize: '46px' }}>Matricúlate a precios asequibles</h2>
        </Card_promo>
      </div>
      <div style={{ cursor: 'pointer' }} onClick={() => window.location.href='/perfil'}>
        <Card_promo color="blue">
          <h2 className="main-text-promoTitle" style={{ color: 'white', fontSize: '46px' }}>Reserva citas online</h2>
        </Card_promo>
      </div>
      <div style={{ cursor: 'pointer' }} onClick={() => window.location.href='/perfil'}>
        <Card_promo color="red">
          <h2 className="main-text-promoTitle" style={{ color: 'white', fontSize: '46px' }}>Certificados de experiencia</h2>
        </Card_promo>
      </div>
    </motion.section>
  );
}