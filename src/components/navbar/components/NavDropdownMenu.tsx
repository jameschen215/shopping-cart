import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/hooks";
import type { UserType } from "@/lib/types";

import { CircleUserRound, LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function NavDropdownMenu() {
  const savedUser = localStorage.getItem("user");
  const currentUser: UserType | null = savedUser ? JSON.parse(savedUser) : null;

  const navigate = useNavigate();
  const { logout } = useAuth();

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
            <Link to={"/login"} className="cursor-pointer">
              <LogIn />
              Sign in
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
