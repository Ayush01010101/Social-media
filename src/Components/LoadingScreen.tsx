import type { FC, ReactNode } from "react";
import { MessageCircle } from "lucide-react";

const LoadingScreen: FC = (): ReactNode => {
  return (
    <div className="fixed inset-0   z-[100] flex flex-col items-center justify-center bg-charcha-bg text-charcha-text-light overflow-hidden">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-64 w-64 rounded-full border border-charcha-purple/30 animate-ripple"></div>
        <div className="absolute h-64 w-64 rounded-full border border-charcha-purple/30 animate-ripple" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute h-64 w-64 rounded-full border border-charcha-purple/30 animate-ripple" style={{ animationDelay: '1s' }}></div>

        {/* LOGO (SIZE INCREASED) */}
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-charcha-surface animate-pulse-slow">
          <MessageCircle className="h-16 w-16 text-charcha-purple" strokeWidth={1.5} />
        </div>
      </div>

      {/* TEXT (FONT SIZE & WEIGHT INCREASED) */}
      <div className="mt-12 text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-5xl font-extrabold tracking-widest text-charcha-text-light">
          CHARCHA POINT
        </h1>
        <p className="text-lg text-charcha-text-muted/80 mt-2 tracking-wider">
          Initializing session...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
