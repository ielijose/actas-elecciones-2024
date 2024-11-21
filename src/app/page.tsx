import RedirectComponent from "./redirect-component";
import { Star } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="h-1/3 bg-yellow-400" aria-hidden="true"></div>
        <div className="h-1/3 bg-blue-600 relative" aria-hidden="true">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-20">
              {[...Array(7)].map((_, i) => (
                <Star
                  key={i}
                  className="w-10 h-10 text-white fill-white absolute"
                  style={{
                    bottom: `${Math.sin((i / 6) * Math.PI) * 60}px`,
                    left: `${(i / 6) * 100}%`,
                    transform: `translateX(-50%) rotate(${i * 10}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="h-1/3 bg-red-600" aria-hidden="true"></div>
      </div>
      <div className="z-10">
        <RedirectComponent />
      </div>
    </main>
  );
}
