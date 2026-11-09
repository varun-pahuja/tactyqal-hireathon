export default function HeroWaves() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-full w-full"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="w-back" x1="720" y1="300" x2="720" y2="720" gradientUnits="userSpaceOnUse">
          <stop stopColor="#004D3B" />
          <stop offset="1" stopColor="#00140E" />
        </linearGradient>
        <linearGradient id="w-main" x1="260" y1="420" x2="1220" y2="720" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00A982" />
          <stop offset="0.45" stopColor="#008F70" />
          <stop offset="1" stopColor="#00291F" />
        </linearGradient>
        <linearGradient id="w-mid" x1="200" y1="520" x2="1300" y2="720" gradientUnits="userSpaceOnUse">
          <stop stopColor="#004D3B" />
          <stop offset="1" stopColor="#00140E" />
        </linearGradient>
        <linearGradient id="w-near" x1="720" y1="600" x2="720" y2="720" gradientUnits="userSpaceOnUse">
          <stop stopColor="#020A07" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <linearGradient id="w-silk" x1="120" y1="470" x2="1360" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopColor="#26C99A" />
          <stop offset="0.5" stopColor="#00A982" />
          <stop offset="1" stopColor="#008F70" />
        </linearGradient>
        <linearGradient id="w-top" x1="720" y1="0" x2="720" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#030303" stopOpacity="1" />
          <stop offset="1" stopColor="#030303" stopOpacity="0" />
        </linearGradient>
        <filter id="w-blur" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* back wave */}
      <path
        className="wave-a"
        d="M0 430C240 372 420 540 720 514C1010 489 1150 344 1440 372V720H0Z"
        fill="url(#w-back)"
        opacity="0.9"
      />
      {/* soft glow behind the crest */}
      <ellipse cx="830" cy="520" rx="620" ry="150" fill="#00A982" opacity="0.14" filter="url(#w-blur)" />

      {/* main emerald wave */}
      <path
        className="wave-b"
        d="M0 478C230 428 380 590 700 566C980 545 1120 414 1440 442V720H0Z"
        fill="url(#w-main)"
      />
      {/* silk highlight along the crest */}
      <path
        className="wave-b"
        d="M0 478C230 428 380 590 700 566C980 545 1120 414 1440 442"
        stroke="url(#w-silk)"
        strokeWidth="34"
        opacity="0.32"
        filter="url(#w-blur)"
      />
      <path
        className="wave-b"
        d="M0 478C230 428 380 590 700 566C980 545 1120 414 1440 442"
        stroke="url(#w-silk)"
        strokeWidth="3"
        opacity="0.85"
      />

      {/* mid secondary wave */}
      <path
        className="wave-c"
        d="M0 556C280 516 440 660 780 636C1080 616 1220 528 1440 548V720H0Z"
        fill="url(#w-mid)"
        opacity="0.95"
      />
      <path
        className="wave-c"
        d="M0 556C280 516 440 660 780 636C1080 616 1220 528 1440 548"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1.5"
      />

      {/* foreground dark wave */}
      <path
        d="M0 650C320 610 540 700 880 690C1180 681 1320 640 1440 660V720H0Z"
        fill="url(#w-near)"
      />

      {/* keep the copy area black */}
      <rect width="1440" height="390" fill="url(#w-top)" />
    </svg>
  );
}
