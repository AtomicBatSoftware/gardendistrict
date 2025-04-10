'use client';

import { useEffect, useState } from 'react';
import { MenuItemComponent } from "@/components/menu-item";
import { fallbackMainMenu, fallbackMainMenuDate } from '@/lib/constants';
import { fetchMenuData } from '@/data-fetcher/sheet-fetcher';



export interface Menu {
  food: MenuCategory;
  drinks: MenuCategory;
}

export interface MenuCategory {
  sections: MenuSection[];
}

export interface MenuSection {
  type: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: number;
  bulkPrice?: number;
}

const CACHE_KEY = "menuCache";
const CACHE_EXPIRATION_KEY = "menuCacheExpiration";
const MAIN_MENU_SHEET_LINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFe8zXVdVW7slOpUu8hsp32MnnEz1ZGRivhEWJjaBUIWxz5jRXd8qYjKrZ05KEQG0F-kT1YFlFiSaZ/pub?output=csv";

export function Menu() {
  const [menuCategorySelection, setMenuCategorySelection] = useState<'FOOD' | 'DRINKS'>('FOOD');
  const [menu, setMenu] = useState<Menu>(fallbackMainMenu);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldRefresh = urlParams.has("refresh");

    const now = Date.now();
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cacheExpiration = localStorage.getItem(CACHE_EXPIRATION_KEY);

    // Use cache if it exists & isn't expired & no refresh requested
    if (cachedData && cacheExpiration && !shouldRefresh && now < Number(cacheExpiration)) {
      setMenu(JSON.parse(cachedData));

      console.info('Fetched menu from cache.');

      return;
    }

    async function fetchData() {
      fetchMenuData(MAIN_MENU_SHEET_LINK, setMenu, CACHE_KEY, CACHE_EXPIRATION_KEY, fallbackMainMenu, fallbackMainMenuDate);
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-center mb-12 space-x-2">
          <button onClick={()=>{setMenuCategorySelection('FOOD')}} className="bg-[#483248] text-[#c17f59] hover:bg-[#702963] hover:text-[#FFD700] px-12 py-2">FOOD</button>
          <button onClick={()=>{setMenuCategorySelection('DRINKS')}} className="bg-[#483248] text-[#c17f59] hover:bg-[#702963] hover:text-[#FFD700] px-12 py-2">DRINKS</button>
        </div>
        <div className="columns-1 md:columns-2 gap-4">
          {
            (menuCategorySelection === 'FOOD' ? menu.food : menu.drinks).sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white p-8 shadow-lg flex flex-col break-inside-avoid mb-6">
                <h2 className="text-3xl font-bold mb-4">{section.type}</h2>
                {
                  section.description &&
                  <p className="text-sm mb-6">
                    {section.description}
                  </p>
                }
                {section.items.map((item, itemIndex) => (
                  <MenuItemComponent
                    key={itemIndex}
                    name={item.name}
                    description={item.description}
                    price={item.price?.toString()}
                    bulkPrice={item.bulkPrice?.toString()}
                  />
                ))}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
