export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-red-500">
        {/* Background Circle */}
        <circle cx="16" cy="16" r="16" className="fill-current opacity-10" />

        {/* Trading Chart Lines */}
        <path
          d="M8 20L12 16L16 24L20 12L24 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
        />

        {/* Commodity Elements */}
        <path
          d="M12 12L14 8L16 12L18 8L20 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        />

        {/* Dynamic Elements */}
        <circle cx="12" cy="16" r="1.5" className="fill-current" />
        <circle cx="16" cy="24" r="1.5" className="fill-current" />
        <circle cx="20" cy="12" r="1.5" className="fill-current" />
      </svg>
    </div>
  );
}
