"use client";
import React, { useState } from 'react';
import { Burger, BurgerLine } from "./ButtonMenuMobile/ButtonMenuMobile.js";
import styled from "styled-components";
import Link from "next/link";

const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: auto;
  z-index: 100;
  background-color: rgb(12, 38, 124);
  padding: 5px 0;
`;
const Nav = styled.ul`
  
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')}; 
  flex-direction: column;
  gap: 10px;
  width: 100%;
  background-color: rgb(12, 38, 124);
  position: absolute;
  top: 50px;
  left: 0;
  padding: 15px;
    animation: delay 0.5s ease-in-out;
      @keyframes delay  {
       0% {
          color: rgba(0,0,0,0);
          background-color: rgba(12, 38, 124, 0.5);

          }
        100% {
         color: auto;
          }
      }
   
  
    @media (min-width: 768px) {
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 20px 0;
    margin: 0 auto;
      animation: delay 1s ease-in-out;
        @keyframes delay  {
         0% {
             color: rgba(0,0,0,0);
            }
         100% {
             color: auto;
            }
      }
  }
`;
export const MenuMobile = () => {

   const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <Menu>
      <Burger onClick={toggleMenu} isOpen={isOpen}>   
        <BurgerLine className="first" />
        <BurgerLine className="second" />
        <BurgerLine className="third" />
      </Burger>
      <Nav isOpen={isOpen}>    
        <li>
          <Link href="/" onClick={closeMenu}>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={closeMenu}>
            <p>About</p>
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={closeMenu}>
            <p>Contact</p>
          </Link>
        </li>
        <li>
          <Link href="/gallery" onClick={closeMenu}>
            <p>Gallery</p>
          </Link>
        </li>
      </Nav>
    </Menu>
  );
};
