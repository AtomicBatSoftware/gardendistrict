import { Navbar } from "@/components/navbar";
import { FullScreenCarousel } from "@/components/image-carousel";
import { InfoBanner } from "@/components/info-banner";

export default function Home() {
  return (
    <div>
      <InfoBanner message="Catering now available." link="/catering"/>
      <Navbar />
      <FullScreenCarousel/>
      <div className="bg-[#FAF9F6] flex flex-col items-center py-12 space-y-4">
        <div className="text-[#b77e08] text-center pt-4 text-5xl">
          HOURS & LOCATION
        </div>
        <div id="locationSection" className="text-center text-2xl">
          55 Monroe Center Street NW
          <br/>
          Grand Rapids, MI 49503
          <br/>
          (616) 376-4002
        </div>
        <div id="hoursSection" className="text-center text-2xl">
          <p className="font-bold underline text-lg text-center">Hours:</p>
          Monday-Thursday
          <br/>
          11:30am-3:00pm 4:30pm-9:00pm
          <br/>
          Friday & Saturday
          <br/>
          11:30am-3:00pm 4:30pm-10:00pm
          <br/>
          Sunday Closed
        </div>

      </div>
    </div>
  );
}
