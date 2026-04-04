export const CONTACT = {
  email: "toyeshhm@gmail.com",
  location: "Frisco, TX",
  github: "https://github.com/Doomtsu",
  linkedin: "https://www.linkedin.com/in/toyeshh-medikonda/",
} as const;

export const socialLinks = [
  { label: "GitHub", href: CONTACT.github },
  { label: "LinkedIn", href: CONTACT.linkedin },
] as const;
