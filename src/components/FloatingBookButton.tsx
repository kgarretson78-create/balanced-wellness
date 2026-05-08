import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

const PODIUM_BOOKING_URL = "https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505";

export function FloatingBookButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-24 left-4 sm:left-6 z-40"
    >
      <a
        href={PODIUM_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 text-[13px] shimmer"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Book Now + Flexible Payments</span>
        <span className="sm:hidden">Book + Pay Plans</span>
      </a>
    </motion.div>
  );
}
