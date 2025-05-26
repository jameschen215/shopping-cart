import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle/mode-toggle";

import logo from "@/assets/images/logo.png";
import { Badge } from "../ui/badge";

export default function Navbar() {
  const cartItemCount = 2;

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <nav
        className="flex h-14 w-full items-center px-4"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
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

          {/* Middle */}
          <div className="flex md:flex-1 md:justify-center">
            <ul className="flex items-center space-x-1" role="list">
              <NavItem to="/" label="Home" />
              <NavItem to="/products" label="Shop" />
            </ul>
          </div>

          {/* Right side actions */}
          <div className="flex flex-1 items-center justify-end space-x-2">
            {/* Cart Button */}
            <Button asChild variant="ghost" size="icon" className="relative">
              <NavLink
                to="/cart"
                aria-label={`Shopping cart with ${cartItemCount} items`}
                className="focus-visible:ring-ring rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <ShoppingCart className="size-5" />
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 flex size-5 items-center justify-center overflow-visible bg-transparent p-0 text-xs font-medium text-rose-500"
                    aria-hidden="true"
                  >
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </Badge>
                )}
              </NavLink>
            </Button>

            {/* Theme toggle */}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

type NavItemProps = {
  to: string;
  label: string;
};

function NavItem({ to, label }: NavItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "text-foreground/80 font-nav-link hover:text-foreground focus:text-foreground focus-visible:ring-ring relative rounded-md px-2 py-1 text-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            isActive &&
              "text-foreground after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-4/5 after:-translate-x-1/2 after:rounded-full",
          )
        }
      >
        {label}
      </NavLink>
    </li>
  );
}
