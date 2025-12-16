import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingAction = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            variant="ghost"
            size="icon"
            className="rounded-full p-6 shadow-lg bg-primary text-primary-foreground hover:text-accent border border-accent hover:bg-primary/90"
          >
            <ArrowUp className="size-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingAction;
