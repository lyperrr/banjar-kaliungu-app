import React, { useEffect, useState } from "react";
import Logo from "/logo-kaliungu.png";

const Loader = ({ onFinish }) => {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let minTimer = null;
    let fallback = null;
    let progressInterval = null;

    // Animasi progress bar
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    const done = () => {
      clearTimeout(minTimer);
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setHidden(true);
        setTimeout(() => onFinish && onFinish(), 450);
      }, 300);
    };

    // minimum 2 detik
    minTimer = setTimeout(() => {
      if (document.readyState === "complete") {
        done();
      }
    }, 2000);

    const onLoad = () => {
      setTimeout(done, 2000);
    };

    if (document.readyState === "complete") {
      setTimeout(done, 2000);
    } else {
      window.addEventListener("load", onLoad);
      fallback = setTimeout(done, 4000);
    }

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(minTimer);
      clearTimeout(fallback);
      clearInterval(progressInterval);
    };
  }, [onFinish]);

  return (
    <div
      className="bg-primary-foreground fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-500 ease-in-out"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {/* Logo */}
      <img
        src={Logo}
        alt="Logo Banjar Kaliungu"
        className="w-64 h-64 object-contain mb-12"
      />

      {/* Loading Bar Container */}
      <div className="w-80 space-y-2">
        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">Memuat...</p>
      </div>
    </div>
  );
};

export default Loader;
