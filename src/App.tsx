import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import FloatingNav from "@/components/FloatingNav";
import CursorAura from "@/components/CursorAura";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Work from "./pages/Work.tsx";
import WorkProjectDetail from "./pages/WorkProjectDetail.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();
const SITE_URL = "https://toyeshh.com";
const SITE_THEME_STORAGE_KEY = "site-theme";
const SITE_THEME_IDS = new Set([
  "site",
  "light",
  "dark-blue",
  "dark-gray",
  "warm",
  "midnight",
]);

const getCanonicalPath = (pathname: string) => {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
};

const CanonicalManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalHref = `${SITE_URL}${getCanonicalPath(pathname)}`;
    let canonicalLink = document.head.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement | null;

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute("href", canonicalHref);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:projectSlug" element={<WorkProjectDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  useEffect(() => {
    const savedThemeId = window.localStorage.getItem(SITE_THEME_STORAGE_KEY);

    if (!savedThemeId || !SITE_THEME_IDS.has(savedThemeId)) {
      return;
    }

    if (savedThemeId === "site") {
      document.documentElement.removeAttribute("data-theme");
      return;
    }

    document.documentElement.setAttribute("data-theme", savedThemeId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CanonicalManager />
          <CursorAura />
          <FloatingNav />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
