import { motion } from "framer-motion";

export default function Button_basic_framer() {
  return (
    <motion.section>
      <a href="mailto:academia.pelu.1234@gmail.com">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "#d1d5db",
            color: "black",
          }}
          transition={{ bounceDamping: 10, bounceStiffness: 600 }}
          className="bg-emerald-600 w-1/2 py-4 rounded-lg text-2xl text-gray-100 font-light tracking-wide"
        >
          Únete
        </motion.button>
      </a>
    </motion.section>
  );
}