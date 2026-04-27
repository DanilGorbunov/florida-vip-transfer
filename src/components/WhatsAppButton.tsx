import { MessageCircle } from "lucide-react";

const PHONE = "14153172089";
const MESSAGE = encodeURIComponent("Hi! I'd like to book a transfer with Florida VIP Transfer.");

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Label — visible on hover (desktop) */}
      <span className="hidden sm:block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 pl-0 group-hover:pl-4 text-sm font-semibold whitespace-nowrap">
        Chat on WhatsApp
      </span>
      <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
        <MessageCircle className="w-7 h-7 fill-white" />
      </div>
    </a>
  );
};

export default WhatsAppButton;
