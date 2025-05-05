export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Iniciar sesión",
      href: "/login",
    },
    {
      label: "Registrarse",
      href: "/register",
    },
    {
      label: "Sobre nosotros",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Iniciar sesión",
      href: "/login",
    },
    {
      label: "Registrarse",
      href: "/register",
    },
    {
      label: "Sobre nosotros",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
