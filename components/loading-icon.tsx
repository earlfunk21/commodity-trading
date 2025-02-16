export default function LoadingIcon() {
  return (
    <div className="flex w-full">
      <div className="flex items-center gap-3 mx-auto">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-500 animate-spin-slow">
          {/* Outer Circle with Pulse */}
          <circle
            cx="16"
            cy="16"
            r="16"
            className="fill-current opacity-10 animate-pulse"
          />

          {/* Animated Trading Lines */}
          <path
            d="M8 20L12 16L16 24L20 12L24 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90 animate-dash"
            pathLength="100"
          />

          {/* Animated Commodity Elements */}
          <path
            d="M12 12L14 8L16 12L18 8L20 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70 animate-dash-reverse"
            pathLength="100"
          />

          {/* Pulsing Dots */}
          <circle
            cx="12"
            cy="16"
            r="1.5"
            className="fill-current animate-pulse-delay-1"
          />
          <circle
            cx="16"
            cy="24"
            r="1.5"
            className="fill-current animate-pulse-delay-2"
          />
          <circle
            cx="20"
            cy="12"
            r="1.5"
            className="fill-current animate-pulse-delay-3"
          />
        </svg>
      </div>
    </div>
  );
}
