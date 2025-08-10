import { Navbar } from "@/components/navbar";
import { FullScreenCarousel } from "@/components/image-carousel";
import { InfoBanner } from "@/components/info-banner";
import { homeMetadata } from "@/config/seo-metadata";

export const metadata = homeMetadata;

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
          <a
            href="https://www.google.com/maps/search/?api=1&query=55+Monroe+Center+Street+NW+Grand+Rapids+MI+49503"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#b77e08] transition-colors duration-200"
          >
            55 Monroe Center Street NW
            <br/>
            Grand Rapids, MI 49503
          </a>
          <br/>
          <a href="tel:6163764002" className="hover:text-[#b77e08] transition-colors duration-200">
            (616) 376-4002
          </a>
        </div>
        <div id="hoursSection" className="text-center text-2xl pt-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <span className="font-semibold mb-1">Monday - Thursday</span>
              <div className="flex flex-col items-center text-[#483248]">
                <span>11:30am - 9pm</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold mb-1">Friday & Saturday</span>
              <div className="flex flex-col items-center text-[#483248]">
                <span>11:30am - 10pm</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold mb-1">Sunday</span>
              <div className="flex flex-col items-center text-[#483248]">
                <span>11:30am - 3pm</span>
              </div>
            </div>
            <hr/>
            <div className="flex flex-col items-center">
              <span className="font-semibold mb-1">Lunch Duo</span>
              <div className="flex flex-col items-center text-[#483248]">
                <span>Monday-Friday from 11:30am-3pm</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
