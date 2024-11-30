import React from "react";
import { Header, HeaderIcons } from "./Header.styled.js";
import { MenuComponent } from "./Menu/Menu.js";
import { AuthStatus } from "../AuthStatus/AuthStatus.js";
import { Authorization } from "../../firebase/Authorization.js";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/Header/Menu/Themes/Theme.js";

export const HeaderComponent = () => {
  return (
    <Header>
      <MenuComponent />
      <AuthStatus /> 
      <ThemeSwitcher />
      <div>
        {/* <HeaderIcons>
          <Link href="https://www.facebook.com/" target="_blank">
            <svg width="30" height="20" fill="#505050" aria-hidden="true">
              <use xlinkHref={`/icons.svg#icon-facebook-1`} />
            </svg>
          </Link>
          <Link href="https://www.twitter.com/" target="_blank">
            <svg width="30" height="20" fill="#505050" aria-hidden="true">
              <use xlinkHref={`/icons.svg#icon-twitter-1`} />
            </svg>
          </Link>
          <Link href="https://www.linkedin.com/" target="_blank">
            <svg width="30" height="20" fill="#505050" aria-hidden="true">
              <use xlinkHref={`/icons.svg#icon-linkedin-1`} />
            </svg>
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <svg width="30" height="20" fill="#505050" aria-hidden="true">
              <use xlinkHref={`/icons.svg#icon-instagram-2`} />
            </svg>
          </Link>
        </HeaderIcons> */}
      </div>
    </Header>
  );
};
