import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useBookingChooser } from "@/components/booking/LocationChooser";

export function FloatingBookButton() {
  const { open } = useBookingChooser();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-24 left-4 sm:left-6 z-40"
    >
      <button
        type="button"
        onClick={() => open()}
        className="group flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 text-[13px] shimmer"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Book Now + Flexible Payments</span>
        <span className="sm:hidden">Book + Pay Plans</span>
      </button>
    </motion.div>
  );
}
