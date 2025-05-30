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
import { ModeToggle } from "@/components/mode-toggle/mode-toggle";

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
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <nav
        className="flex h-12 w-full items-center px-4"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Left - Brand Logo */}
        <div className="flex flex-1">
          <NavLink
            to="/"
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
          </NavLink>
        </div>

        {/* Middle - Navigation Menu */}
        <NavbarMenu />

        {/* Right - Buttons */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Theme toggle */}
          <ModeToggle />
          {/* <AppAvatar /> */}
          <NavDropdownMenu />
        </div>
      </nav>
    </div>
  );
}

export function NavbarMenu() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/cart", label: "Cart" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        {links.map(({ to, label }, index) => (
          <NavigationMenuItem key={index}>
            <NavLink to={to}>
              {({ isActive }) => (
                <NavigationMenuLink
                  asChild
                  active={isActive}
                  className={cn(
                    "hover:border-foreground/25 rounded-none border-b-1 border-transparent p-px hover:border-b-1 hover:bg-transparent",
                    isActive &&
                      "border-foreground/85 hover:border-foreground/85 border-b-1",
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
