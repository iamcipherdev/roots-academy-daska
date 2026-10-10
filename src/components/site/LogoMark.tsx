/** Brand mark — matches the site favicon (src/app/icon.svg):
 *  crimson rounded square with a white "R". */
export default function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#C1121F" />
      <text
        x="32"
        y="44"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="34"
        fontWeight="800"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        R
      </text>
      <circle cx="18" cy="14" r="3.5" fill="#FFFFFF" />
      <circle cx="28" cy="11" r="4" fill="#FFFFFF" />
      <circle cx="39" cy="11" r="4" fill="#FFFFFF" />
    </svg>
  );
}
