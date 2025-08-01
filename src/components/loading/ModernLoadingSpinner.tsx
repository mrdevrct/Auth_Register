// src/components/loading/ModernLoadingSpinner.tsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const ModernLoadingSpinner = () => {
  const dotVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0.4, 1, 0.4],
      transition: {
        repeat: Infinity,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center bg-transparent gap-6 my-auto">
      {/* دایره‌های متحرک */}
      <motion.div
        className="flex space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-blue-500 rounded-full"
            variants={dotVariants}
            animate="animate"
            custom={index}
            transition={{
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* متن بارگذاری */}
      <motion.p
        className="text-lg font-semibold text-gray-600"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        در حال بارگذاری...
      </motion.p>
    </div>
  );
};

export default ModernLoadingSpinner;
