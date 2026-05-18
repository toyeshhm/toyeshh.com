export const CONTACT = {
  email: "toyeshhm@gmail.com",
  location: "Frisco, TX",
  github: "https://github.com/toyeshhm",
  linkedin: "https://www.linkedin.com/in/toyeshh-medikonda/",
} as const;

/** Public Formspree endpoint (safe to ship in the client). Override with VITE_FORMSPREE_URL when deploying a fork. */
export const FORMSPREE_FORM_URL = "https://formspree.io/f/xojppjlq";

export const socialLinks = [
  { label: "GitHub", href: CONTACT.github },
  { label: "LinkedIn", href: CONTACT.linkedin },
] as const;
