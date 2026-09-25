type IconProps = {
  className?: string;
};

/**
 * runcycle znak — osmokraka zvjezdica ("starburst").
 * Latice su rombovi koji se suzavaju ka centru, kao na referenci.
 */
const PETAL = "M12 1.5 L13.05 10.7 L12 12.7 L10.95 10.7 Z";

export function Asterisk({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d={PETAL}
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}
