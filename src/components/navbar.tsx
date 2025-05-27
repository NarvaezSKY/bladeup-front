import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import logo from "../assets/logoBladeUp.png";
import { GithubIcon } from "@/components/icons";
import { useAuthStore } from "@/app/shared/store/AuthStore";
import { toast } from "sonner";

export const Navbar = () => {
  const { token, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Sesión cerrada correctamente");
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="z-50">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1 cursor-pointer"
            color="foreground"
            onClick={window.location.reload}
            isExternal={false}
          >
            <img alt="Logo" className="h-16 w-16" src={logo} />
            <p className="font-bold text-inherit text-3xl">BladeUp!</p>
          </Link>
        </NavbarBrand>
        {!token && (
          <div className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
        )}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          {token && (
            <button
              onClick={handleLogout}
              className="text-secondary hover:underline font-semibold"
            >
              Cerrar sesión
            </button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {!token ? (
            siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))
          ) : (
            <NavbarMenuItem>
              <button
                onClick={handleLogout}
                className="text-primary hover:underline font-semibold w-full text-left"
              >
                Cerrar sesión
              </button>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
