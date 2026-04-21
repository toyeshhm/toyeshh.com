import { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const MagneticButton = ({
  children,
  className = "",
  onClick,
  disabled,
  type = "button",
}: MagneticButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`magnetic-btn ${className} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

export default MagneticButton;
