import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* اسپینر چرخان */}
        <motion.div
          className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        {/* متن با انیمیشن پالس */}
        <motion.p
          className="mt-4 text-lg font-semibold text-gray-700"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
