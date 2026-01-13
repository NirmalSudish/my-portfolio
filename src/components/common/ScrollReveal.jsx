import { motion } from "framer-motion";

const ScrollReveal = ({ children, delay = 0, x = 0, y = 30 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: x, y: y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }} // Triggers when 10% of the element is visible
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