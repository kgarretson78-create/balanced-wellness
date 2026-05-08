import { useEffect } from "react";

const PODIUM_BOOKING_URL = "https://booking.podium.com/medspa/019c25c3-bfb8-7652-9b53-3b7f41adc505";

export default function Book() {
  useEffect(() => {
    window.location.href = PODIUM_BOOKING_URL;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-lg text-foreground/60">Redirecting to booking...</p>
      </div>
    </div>
  );
}
