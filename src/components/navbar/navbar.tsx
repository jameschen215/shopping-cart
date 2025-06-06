import { NavLink } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import {
  LogIn,
  LogOut,
  Settings,
  ShoppingCart,
  User,
  UserCheck,
} from "lucide-react";
import { ModeToggle } from "../mode-toggle/ModeToggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuth } from "@/lib/hooks";
import { Badge } from "../ui/badge";

export default function Navbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-14 w-full items-center px-4">
        <BrandAndLogo />

        <div className="flex flex-1 items-center justify-end space-x-2">
          <CartButton />
          <ModeToggle />
          <NavDropdownMenu />
        </div>
      </div>
    </header>
  );
}

function NavDropdownMenu() {
  const savedUser = localStorage.getItem("user");
  const currentUser = savedUser ? JSON.parse(savedUser) : null;

  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant={"ghost"} size={"icon"}>
          {currentUser ? (
            <UserCheck className="size-5 text-blue-500" strokeWidth={1.5} />
          ) : (
            <User className="size-5" strokeWidth={1.5} />
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* Logged in */}
      {currentUser ? (
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button variant={"ghost"}>
              <Settings />
              Settings
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              onClick={() => {
                logout();
                toast.warning("You are logged out.");
              }}
            >
              <LogOut />
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <NavLink to={"/login"} className="cursor-pointer">
              <LogIn />
              Sign in
            </NavLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
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

function CartButton() {
  const cartItemCount = 7;

  return (
    <Button variant="ghost" size="icon" className="relative">
      <NavLink
        to="/cart"
        aria-label={`Shopping cart with ${cartItemCount} items`}
        // className="focus-visible:ring-ring rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <ShoppingCart className="size-5" strokeWidth={1.5} />
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
  );
}
