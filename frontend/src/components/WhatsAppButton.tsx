import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const handleClick = () => {
    window.open("https://wa.me/251911123456", "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      variant="whatsapp"
      size="lg"
      className="fixed bottom-6 left-6 z-50 shadow-lg hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">WhatsApp Us</span>
    </Button>
  );
}
