import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function TelegramButton() {
  const handleClick = () => {
    window.open("https://t.me/novaexams", "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 left-6 z-50 shadow-lg hover:scale-110 transition-transform bg-[#0088cc] hover:bg-[#0099e5] text-white"
    >
      <Send className="w-5 h-5" />
      <span className="hidden sm:inline">Contact Us</span>
    </Button>
  );
}
