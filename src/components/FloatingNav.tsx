import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Work", path: "/work" },
  { label: "Contact", path: "/contact" },
];

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    isVisible ? (
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel px-2 py-2">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="relative px-5 py-2.5 rounded-xl text-sm font-body block transition-colors duration-300"
                >
                  {isActive ? (
                    <div className="absolute inset-0 rounded-xl bg-primary/15 border border-primary/20" />
                  ) : null}
                  <span
                    className={`relative z-10 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    ) : null
  );
};

export default FloatingNav;
