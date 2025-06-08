import Link from "next/link"
import Image from "next/image"

export default function AtomicBatFooter() {
  return (
    <footer className="w-full py-2 bg-[#FAF9F6] border-t border-gray-200">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <Link
          href="https://atomicbatsoftware.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-700 hover:underline transition-colors group"
        >
          <span className="text-sm font-medium">Created by Atomic Bat Software</span>
          <div className="text-gray-700 group-hover:text-gray-900 transition-colors">
            <Image alt="atomic bat logo" src='/ab-logo-only.png' width={50} height={50}/>
          </div>
        </Link>
      </div>
    </footer>
  )
}
