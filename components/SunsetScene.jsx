/** Placeholder art for the About photo: a small synthwave sunset (shown when ABOUT.photo is empty). */
export default function SunsetScene() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#07060d" /><stop offset=".45" stopColor="#1c0f33" /><stop offset=".62" stopColor="#4a1747" /><stop offset=".68" stopColor="#ff4f7a" />
        </linearGradient>
        <linearGradient id="sunG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd25a" /><stop offset=".5" stopColor="#ff6a2b" /><stop offset="1" stopColor="#ff2e88" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0b22" /><stop offset="1" stopColor="#07060a" />
        </linearGradient>
        <radialGradient id="glow" cx=".5" cy=".68" r=".5"><stop offset="0" stopColor="#ff5a1f" stopOpacity=".55" /><stop offset="1" stopColor="#ff5a1f" stopOpacity="0" /></radialGradient>
        <clipPath id="sunCut">
          <rect x="0" y="0" width="100" height="49" /><rect x="0" y="50.6" width="100" height="3.6" /><rect x="0" y="55.8" width="100" height="2.8" />
          <rect x="0" y="60.2" width="100" height="2" /><rect x="0" y="63.6" width="100" height="1.4" /><rect x="0" y="66.2" width="100" height="1.8" />
        </clipPath>
      </defs>
      <rect width="100" height="100" fill="url(#sky)" />
      <g fill="#fff" opacity=".7"><circle cx="12" cy="10" r=".35" /><circle cx="27" cy="22" r=".25" /><circle cx="44" cy="7" r=".3" /><circle cx="71" cy="14" r=".35" /><circle cx="86" cy="27" r=".25" /><circle cx="91" cy="6" r=".3" /><circle cx="58" cy="25" r=".2" /><circle cx="6" cy="33" r=".25" /></g>
      <rect width="100" height="100" fill="url(#glow)" />
      <circle cx="50" cy="50" r="22" fill="url(#sunG)" clipPath="url(#sunCut)" />
      <path d="M0 64 L10 58 L18 62 L27 55 L36 61 L42 59 L48 63 L58 57 L66 62 L74 56 L83 61 L91 58 L100 62 L100 68 L0 68 Z" fill="#160a24" />
      <path d="M0 66 L14 62 L24 65 L35 61 L47 66 L60 62 L72 65 L86 61 L100 64 L100 68 L0 68 Z" fill="#0f0718" />
      <rect y="68" width="100" height="32" fill="url(#ground)" />
      <rect y="67.6" width="100" height=".8" fill="#ff4f7a" opacity=".9" />
      <g stroke="#ff3d8b" strokeWidth=".35" opacity=".55" fill="none">
        <path d="M0 70.5H100M0 73.5H100M0 77.5H100M0 83H100M0 90.5H100" />
        <path d="M50 68V100M50 68L35 100M50 68L65 100M50 68L18 100M50 68L82 100M50 68L-2 100M50 68L102 100M50 68L-25 100M50 68L125 100" />
      </g>
    </svg>
  );
}
