import { Navbar } from "@/components/navbar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Menu } from "@/components/menu";
import { CookingPot } from "lucide-react"
import { fallbackCateringMenu, fallbackCateringMenuDate } from "@/lib/constants";

const CACHE_KEY = "cateringMenuCache";
const CACHE_EXPIRATION_KEY = "cateringMenuCacheExpiration";
const MAIN_MENU_SHEET_LINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFe8zXVdVW7slOpUu8hsp32MnnEz1ZGRivhEWJjaBUIWxz5jRXd8qYjKrZ05KEQG0F-kT1YFlFiSaZ/pub?output=csv&gid=678587674";


export default function CateringPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full bg-[#f5f5f5] p-8">
        <div className="max-w-6xl mx-auto">
          <Alert className="bg-[#b77e08] text-white">
            <CookingPot color="white" className="text-white h-4 w-4" />
            <AlertTitle><div className="text-lg font-bold">Catering Notices</div></AlertTitle>
            <AlertDescription>
              <ul className="list-disc">
                <li>
                  Catering orders require a minimum of 48 hours notice. Call 616-376-4002
                </li>
                <li>
                  Napkins, flatware, and serving utensils are available upon request
                </li>
                <li>
                  {/* TODO: this file is hosted on personal google drive, change to client's drive */}
                  Download the catering menu <a className="underline" href="https://drive.google.com/file/d/161gl3zU7yXzT7j6zJF7ptXBEyMCk62ur/view?usp=sharing" target="_blank">here</a>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
          <div className="columns-1 md:columns-2 gap-4">
          </div>
        </div>
        <Menu
          menuSheetUrl={MAIN_MENU_SHEET_LINK}
          cacheKey={CACHE_KEY}
          cacheExpirationKey={CACHE_EXPIRATION_KEY}
          fallbackMenu={fallbackCateringMenu}
          fallbackMenuDate={fallbackCateringMenuDate} />
      </div>
    </div>
  );
}
