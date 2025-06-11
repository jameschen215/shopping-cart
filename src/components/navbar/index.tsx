import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { CircleUserRound, LogIn, LogOut, ShoppingCart } from "lucide-react";

import logo from "@/assets/images/logo.png";
import type { UserType } from "@/lib/types";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth, useCart } from "@/lib/hooks";

export default function Navbar() {
  return (
    <header className="dark:bg-background supports-[backdrop-filter]:dark:bg-background/60 sticky top-0 z-50 mx-auto w-full max-w-[1440px] border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60">
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
  const currentUser: UserType | null = savedUser ? JSON.parse(savedUser) : null;

  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant={"ghost"} size={"icon"}>
          {currentUser ? (
            <div className="bg-foreground/5 rounded-full p-1 text-xs">
              {currentUser.name.firstname.slice(0, 1).toUpperCase()}
              {currentUser.name.lastname.slice(0, 1).toUpperCase()}
            </div>
          ) : (
            <CircleUserRound className="size-5" aria-hidden strokeWidth={1.5} />
          )}{" "}
          {/* <span className="hidden font-light md:block">Account</span> */}
        </Button>
      </DropdownMenuTrigger>

      {/* Logged in */}
      {currentUser ? (
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              onClick={() => {
                logout();
                navigate("/");
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
      <NavLink
        to="/"
        className="focus-visible:ring-ring flex items-center space-x-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <img
          src={logo}
          alt="Odin Store logo"
          loading="eager"
          className="size-6"
        />
        <span className="font-brand hidden text-2xl font-normal sm:inline-block">
          Odin Store
        </span>
        <span className="sr-only">Odin Store - Go to homepage</span>
      </NavLink>
    </div>
  );
}

function CartButton() {
  const { user } = useAuth();
  const { cartItems } = useCart();

  const itemsNumber = cartItems.reduce((a, c) => a + c.quantity, 0);

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <NavLink
        to="/cart"
        aria-label={`Shopping cart with ${cartItems.length} items`}
      >
        <ShoppingCart className="size-5" strokeWidth={1.5} />
        {cartItems.length > 0 && user !== null && (
          <Badge
            className="absolute -top-1 -right-1 flex size-5 items-center justify-center overflow-visible bg-transparent p-0 text-xs font-medium text-rose-500"
            aria-hidden="true"
          >
            {itemsNumber > 99 ? "99+" : itemsNumber}
          </Badge>
        )}
      </NavLink>
    </Button>
  );
}
