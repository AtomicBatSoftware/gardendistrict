import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export function Navbar() {
  return (
    <nav className="bg-[#2A1F2D] px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <NavLink href="/" label="HOME" />
          <Separator />
          <NavLink href="/menu" label="MENU"/>
          <Separator />
          <NavLink href="https://www.clover.com/online-ordering/gardendistrict-grand-rapids#" label="ORDER" />
          <Separator />
          <NavLink href="https://www.waitlist.me/w/17334990070#" label="RESERVE" />
          <Separator />
          <NavLink href="/catering" label="CATERING" />
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://www.facebook.com/profile.php?id=61572319708987#" className="text-[#B4A365] hover:text-[#D4C385]">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://www.instagram.com/gardendistrictgr" className="text-[#B4A365] hover:text-[#D4C385]">
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
      className={`text-sm font-medium ${
        isActive ? "text-[#D4C385] underline decoration-2 underline-offset-4" : "text-[#B4A365] hover:text-[#D4C385]"
      }`}
    >
      {label}
    </Link>
  )
}

function Separator() {
  return <span className="text-[#B4A365]">|</span>
}
