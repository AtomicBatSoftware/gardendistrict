'use client';

import { useState } from "react";
import  Link  from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Menu, X } from "lucide-react"; // Assuming you're using Lucide icons

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#483248] px-4 py-3 sticky top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo or Brand */}
          <div>
            <Link href="/">
              <Image
                src="/gd_logo_transparent.png"
                height={75}
                width={75}
                alt="logo"
                />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-3">
            <NavLink href="/" label="HOME" />
            <Separator />
            <NavLink href="/menu" label="MENU" />
            <Separator />
            <NavLink
              href="https://www.clover.com/online-ordering/gardendistrict-grand-rapids#"
              label="ORDER"
            />
            <Separator />
            <NavLink
              href="https://www.waitlist.me/w/17334990070#"
              label="RESERVE"
            />
            <Separator />
            <NavLink href="/contact" label="CONTACT" />
          </div>

          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://www.facebook.com/profile.php?id=61572319708987#"
              className="text-[#b77e08] hover:text-[#FFD700]"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/gardendistrictgr"
              className="text-[#b77e08] hover:text-[#FFD700]"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#b77e08] hover:text-[#FFD700] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#483248] z-[60] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="text-[#b77e08] hover:text-[#FFD700] mb-6"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-4">
            <NavLink href="/" label="HOME" />
            <NavLink href="/menu" label="MENU" />
            <NavLink
              href="https://www.clover.com/online-ordering/gardendistrict-grand-rapids#"
              label="ORDER"
            />
            <NavLink
              href="https://www.waitlist.me/w/17334990070#"
              label="RESERVE"
            />
            <NavLink href="/contact" label="CONTACT" />
          </div>

          {/* Social Icons (Mobile) */}
          <div className="mt-6 flex space-x-4">
            <Link
              href="https://www.facebook.com/profile.php?id=61572319708987#"
              className="text-[#b77e08] hover:text-[#FFD700]"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/gardendistrictgr"
              className="text-[#b77e08] hover:text-[#FFD700]"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for Side Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

function NavLink({ href, label, isActive }: { href: string; label: string; isActive?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-sm font-black ${
        isActive ? "text-[#b77e08] underline decoration-2 underline-offset-4" : "text-[#b77e08] hover:text-[#FFD700]"
      }`}
    >
      {label}
    </Link>
  )
}

function Separator() {
  return <span className="text-[#b77e08]">|</span>
}
