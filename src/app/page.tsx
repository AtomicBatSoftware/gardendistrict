import { Navbar } from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="/gd_logo.png"
        width={400}
        height={400}
        alt="Garden District Logo"
        />
      <div className="text-4xl font-bold">
        NOW OPEN
      </div>
      </div>
    </div>
  );
}
