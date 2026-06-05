import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import FavoritesIcon from "./FavoritesIcon";
import CartIcon from "./CartIcon";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, UserButton, } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

const Header =async () => {
  const user = await currentUser();
  
  return (
    <header className="bg-white py-5">
      <Container className="flex items-center justify-between text-shadow-black md-gap-0">
        <div className="w-auto md:1-3 flex items-center gap-2.5 justify-start md:gap-0">
          <ModeToggle />
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex item-center justify-end gap-5">
          <SearchBar />
          <FavoritesIcon />
          <CartIcon />
         <ClerkLoaded>
            <UserButton />
        {!user && <SignIn />}
         </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
