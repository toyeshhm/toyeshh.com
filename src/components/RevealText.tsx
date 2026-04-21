import { ReactNode } from "react";

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const RevealText = ({
  children,
  className = "",
}: RevealTextProps) => (
  <div className={className}>{children}</div>
);

export default RevealText;
