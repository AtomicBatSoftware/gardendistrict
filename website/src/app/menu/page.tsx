import { Menu } from "@/components/menu";
import { Navbar } from "@/components/navbar";
import { fallbackMainMenu, fallbackMainMenuDate } from '@/lib/constants';

const CACHE_KEY = "menuCache";
const CACHE_EXPIRATION_KEY = "menuCacheExpiration";
const MAIN_MENU_SHEET_LINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFe8zXVdVW7slOpUu8hsp32MnnEz1ZGRivhEWJjaBUIWxz5jRXd8qYjKrZ05KEQG0F-kT1YFlFiSaZ/pub?output=csv";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Menu
        menuSheetUrl={MAIN_MENU_SHEET_LINK}
        cacheKey={CACHE_KEY}
        cacheExpirationKey={CACHE_EXPIRATION_KEY}
        fallbackMenu={fallbackMainMenu}
        fallbackMenuDate={fallbackMainMenuDate} />
    </div>
  );
}
