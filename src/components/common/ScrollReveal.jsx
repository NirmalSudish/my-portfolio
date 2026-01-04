import { motion } from "framer-motion";

const ScrollReveal = ({ children, delay = 0, x = 0, y = 30 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: x, y: y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // Triggers 100px before the element hits the top
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // Boutique "slow-out" easing
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;