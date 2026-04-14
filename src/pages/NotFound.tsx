import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  useEffect(() => {
    const existingRobots = document.head.querySelector(
      "meta[name='robots']",
    ) as HTMLMetaElement | null;
    const previousContent = existingRobots?.getAttribute("content") ?? null;
    const robotsMeta = existingRobots ?? document.createElement("meta");

    if (!existingRobots) {
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.setAttribute("content", "noindex, nofollow");

    return () => {
      if (previousContent) {
        robotsMeta.setAttribute("content", previousContent);
      } else if (!existingRobots) {
        robotsMeta.remove();
      } else {
        robotsMeta.removeAttribute("content");
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Oops! Page not found
        </p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
