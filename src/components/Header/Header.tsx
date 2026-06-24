import React from "react";
import Container from "@/src/components/Feature/Container";
import Logo from "@/src/components/Logo/Logo";
import HeaderMenu from "@/src/components/Header/HeaderMenu"
import SearchBar from "@/src/components/SearchBar/SearchBar";
import FavoritesIcon from "@/src/components/Icon/FavoritesIcon";
import CartIcon from "@/src/components/Icon/CartIcon";
import SignIn from "@/src/components/User/SignIn";
import MobileMenu from "@/src/components/Sidebar/MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, UserButton, } from "@clerk/nextjs";


const Header =async () => {
  const user = await currentUser();
  
  return (
    <header className="bg-white py-5">
      <Container className="flex items-center justify-between text-shadow-black md-gap-0">
        <div className="w-auto md:1-3 flex items-center gap-2.5 justify-start md:gap-0">
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
