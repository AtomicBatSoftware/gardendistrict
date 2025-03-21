import { CateringForm } from "@/components/catering-form";
import { Navbar } from "@/components/navbar";

export default function CateringPage() {
  return (
    <div>
      <Navbar />
      <div className="text-center">
        <h1 className="text-4xl">Catering</h1>
        Some catering info
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-11/12 h-[90vh]">
          <embed
            src={`https://docs.google.com/gview?url=https://www.kome-austin.com/miso/wp-content/uploads/2024/07/Kome-Menu-Lunch.pdf&embedded=true`}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
