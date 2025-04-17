'use client';

import { useEffect, useState } from 'react';
import { MenuItemComponent } from "@/components/menu-item";
import { fetchMenuData } from '@/data-fetcher/sheet-fetcher';
import { Skeleton } from './ui/skeleton';



export interface Menu {
  food: MenuCategory;
  drinks: MenuCategory;
 // menusByCategory: Map<string,MenuCategory[]>;
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

interface MenuProps {
  menuSheetUrl: string;
  cacheKey: string;
  cacheExpirationKey: string;
  fallbackMenu: Menu;
  fallbackMenuDate: string;
}
export function Menu(props: MenuProps) {
  const [menuCategorySelection, setMenuCategorySelection] = useState<string>('FOOD');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // TODO: add "data loading" state here. Setting menu causes a flicker of prices when re-rendering menu
  const [menu, setMenu] = useState<Menu>(props.fallbackMenu);

  useEffect(() => {
    setIsLoading(true);
    console.log("set loading to true")
    const urlParams = new URLSearchParams(window.location.search);
    const shouldRefresh = urlParams.has("refresh");

    const now = Date.now();
    const cachedData = localStorage.getItem(props.cacheKey);
    const cacheExpiration = localStorage.getItem(props.cacheExpirationKey);

    // Use cache if it exists & isn't expired & no refresh requested
    if (cachedData && cacheExpiration && !shouldRefresh && now < Number(cacheExpiration)) {
      setMenu(JSON.parse(cachedData));
      setIsLoading(false);
      console.info('Fetched menu from cache.');

      return;
    }

    async function fetchData() {
      fetchMenuData(props.menuSheetUrl, setMenu, props.cacheKey, props.cacheExpirationKey, props.fallbackMenu, props.fallbackMenuDate);
    }

    fetchData();
    setIsLoading(false);

  }, [props]);

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] p-8">
      <div className="max-w-6xl mx-auto">
        {
          isLoading ?
          <>
            <div className="columns-1 md:columns-2 gap-4 pt-16">
              {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="break-inside-avoid mb-4">
                    <Skeleton className="h-96 w-full rounded-xl" />
                  </div>
                ))}
            </div>
          </>
          :
          <>
            <div className="flex flex-row justify-center mb-12 space-x-2">
              <button onClick={()=>{setMenuCategorySelection('FOOD')}} className="bg-[#483248] text-[#c17f59] hover:bg-[#702963] hover:text-[#FFD700] px-12 py-2">FOOD</button>
              {
                // TODO: populate this sections by seeing what is available in spreadsheet
                menu.drinks.sections.length !== 0 &&
                <button onClick={()=>{setMenuCategorySelection('DRINKS')}} className="bg-[#483248] text-[#c17f59] hover:bg-[#702963] hover:text-[#FFD700] px-12 py-2">DRINKS</button>
              }


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
          </>
        }

      </div>
    </div>
  );
}
