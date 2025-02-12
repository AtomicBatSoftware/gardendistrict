import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-[#483248] px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <NavLink href="/" label="HOME" />
          <Separator />
          <NavLink href="/menu" label="MENU"/>
          <Separator />
          <NavLink href="https://www.clover.com/online-ordering/gardendistrict-grand-rapids#" label="ORDER" />
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://www.facebook.com/profile.php?id=61572319708987#" className="text-[#b77e08] hover:text-[#FFD700]">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://www.instagram.com/gardendistrictgr" className="text-[#b77e08] hover:text-[#FFD700]">
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

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
