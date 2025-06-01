import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ModeToggle } from "../mode-toggle/ModeToggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { default as defaultAvatar } from "@/assets/images/default.jpg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function Navbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-12 w-full items-center px-4">
        {/* Left - Brand Logo */}
        <BrandAndLogo />

        {/* Middle - Navigation Menu */}
        <NavbarMenu />

        {/* Right - Buttons */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Theme toggle */}
          <ModeToggle />
          {/* <AppAvatar /> */}
          <NavDropdownMenu />
        </div>
      </div>
    </header>
  );
}

export function NavbarMenu() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/cart", label: "Cart" },
  ];

  return (
    <NavigationMenu aria-label="Main navigation">
      <NavigationMenuList className="gap-4">
        {links.map(({ to, label }, index) => (
          <NavigationMenuItem key={index}>
            <NavLink to={to}>
              {({ isActive }) => (
                <NavigationMenuLink
                  asChild
                  active={isActive}
                  className={cn(
                    "hover:bg-transparent hover:underline hover:decoration-2 hover:underline-offset-6",
                    isActive && "underline decoration-2 underline-offset-6",
                  )}
                >
                  <span>{label.toUpperCase()}</span>
                </NavigationMenuLink>
              )}
            </NavLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function AppAvatar({
  username,
  imageUrl,
}: {
  username?: string;
  imageUrl?: string;
}) {
  return (
    <Avatar data-testid="user-photo">
      <AvatarImage src={imageUrl ?? defaultAvatar} alt="User photo" />
      <AvatarFallback>{username ?? "No name"}</AvatarFallback>
    </Avatar>
  );
}

function NavDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AppAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>John Doe</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            onClick={() => toast.warning("You are logged out.")}
          >
            <LogOut />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function BrandAndLogo() {
  return (
    <div className="flex flex-1">
      <a
        href="/"
        className="focus-visible:ring-ring flex items-center space-x-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <img
          src={logo}
          alt="Odin Store logo"
          loading="eager"
          className="size-7"
        />
        <span className="font-display hidden text-lg font-medium tracking-tight sm:inline-block">
          Odin Store
        </span>
        <span className="sr-only">Odin Store - Go to homepage</span>
      </a>
    </div>
  );
}
