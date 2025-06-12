import { NavLink } from "react-router-dom";

import logo from "@/assets/images/logo.png";

export default function BrandAndLogo() {
  return (
    <div className="flex flex-1">
      <NavLink
        to="/"
        aria-label="Odin Store homepage"
        className="focus-visible:ring-ring flex items-center space-x-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <img
          src={logo}
          alt="Odin Store logo"
          loading="eager"
          className="size-[22px]"
          aria-hidden="true"
        />
        <span className="font-brand hidden text-2xl font-normal sm:inline-block">
          ODIN STORE
        </span>
        <span className="sr-only">Odin Store - Go to homepage</span>
      </NavLink>
    </div>
  );
}
