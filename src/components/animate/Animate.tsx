import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

// تعریف انواع انیمیشن‌های موجود
type AnimationType =
  | "topToBottom"
  | "bottomToTop"
  | "leftToRight"
  | "rightToLeft"
  | "fadeIn"
  | "scaleUp"
  | "rotateIn"
  | "buttonScale";

interface AnimateProps {
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
  duration?: number;
  delay?: number;
  animate?: "idle" | "loading"; // برای انیمیشن‌های دکمه
}

// تعریف انیمیشن‌ها
const animationVariants: Record<AnimationType, Variants> = {
  topToBottom: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
  },
  bottomToTop: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  leftToRight: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  rightToLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
  },
  buttonScale: {
    idle: { scale: 1, backgroundColor: "#2563eb" },
    loading: { scale: 0.98, backgroundColor: "#1e3a8a" },
  },
};

const Animate: React.FC<AnimateProps> = ({
  children,
  animation = "fadeIn",
  className,
  duration = 0.5,
  delay = 0,
  animate,
}) => {
  const variants = animationVariants[animation] || animationVariants.fadeIn;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={animate || "animate"}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Animate;