// ConsejoSeguro Logotipo SVG
export default function Logo({ className = '', ...props }) {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      aria-label="ConsejoSeguro logo"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#003366" />
          <stop offset="1" stopColor="#008000" />
        </linearGradient>
      </defs>
      <g>
        <path d="M12 14v20c0 12 20 18 20 18s20-6 20-18V14l-20-8-20 8z" fill="url(#bg-gradient)" />
        <ellipse cx="32" cy="20" rx="6" ry="4" fill="#fff" opacity="0.7" />
        <path d="M32 24c2 0 6 2 6 6s-4 9-6 9-6-5-6-9 4-6 6-6z" fill="#fff" />
        <path d="M32 28v5" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="14" r="3" fill="#FFA500" />
        <path d="M29 33c1 2 6 2 7 0" stroke="#008000" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

